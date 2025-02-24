import { getTotalCountsStats } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getTotalCountsStats'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { getContractInfo } from '@app/web/conseiller-numerique/getContractInfo'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { findConseillerNumeriqueV1 } from '@app/web/external-apis/conseiller-numerique/searchConseillerNumeriqueV1'
import { getLieuxActivites } from '@app/web/lieu-activite/getLieuxActivites'
import { prismaClient } from '@app/web/prismaClient'
import { getStructureEmployeuseAddress } from '@app/web/structure/getStructureEmployeuseAddress'

const activitesFiltersLastDays = (daysCount: number) => {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() - daysCount)
  const activitesFilters: ActivitesFilters = {
    du: currentDate.toISOString().split('T')[0],
    au: new Date().toISOString().split('T')[0],
  }
  return activitesFilters
}

const isNull = <T>(nullable: T | null) => nullable == null

const coordinationFor =
  (coordinateurId: string) => async (mediateurIds: string[]) =>
    Promise.all(
      mediateurIds.map((mediateurId: string) =>
        prismaClient.mediateurCoordonne.findFirst({
          where: { mediateurId, coordinateurId },
        }),
      ),
    )

const areMediateursCoordonnes = async (
  mediateurIds: string[],
  coordinateurId?: string,
) => {
  if (coordinateurId == null) return false
  const mediateursCoordonnes =
    await coordinationFor(coordinateurId)(mediateurIds)
  return mediateursCoordonnes.some(isNull)
}

export const getMediateurPageData = async (
  mediateurId: string,
  coordinateurId?: string,
) => {
  const user = await authenticateUser()

  if (
    (await areMediateursCoordonnes(
      [mediateurId, ...(user.mediateur?.id ? [user.mediateur?.id] : [])],
      coordinateurId,
    )) ||
    (await areMediateursCoordonnes([mediateurId], user.coordinateur?.id))
  ) {
    return null
  }

  const mediateur = await prismaClient.mediateur.findUnique({
    where: { id: mediateurId },
    select: {
      id: true,
      user: {
        select: { id: true, name: true, email: true, phone: true },
      },
      conseillerNumerique: {
        select: { id: true, idPg: true },
      },
      coordinations: {
        select: { suppression: true },
        where: { coordinateurId: coordinateurId ?? user.coordinateur?.id },
      },
    },
  })

  if (mediateur == null) return null

  if (
    mediateur.conseillerNumerique != null &&
    mediateur.conseillerNumerique.idPg == null
  ) {
    const conumV1 = await findConseillerNumeriqueV1({
      id: mediateur.conseillerNumerique.id,
      includeDeleted: true,
    })
    mediateur.conseillerNumerique.idPg = conumV1?.conseiller.idPG ?? null
  }

  const contract = await getContractInfo(mediateur.user.email)

  const { beneficiaires, accompagnements } = await getTotalCountsStats({
    user,
    mediateurIds: [mediateur.id],
    activitesFilters: activitesFiltersLastDays(30),
  })

  const structureEmployeuse = await getStructureEmployeuseAddress(
    mediateur.user.id,
  )

  const lieuxActivites = await getLieuxActivites(mediateur.id)

  return {
    mediateur,
    statistiques: {
      beneficiairesAccompagnes: beneficiaires.total,
      accompagnements: accompagnements.total,
    },
    contract,
    structureEmployeuse,
    lieuxActivites,
  }
}
