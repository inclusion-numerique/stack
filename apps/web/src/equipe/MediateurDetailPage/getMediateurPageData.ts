import { prismaClient } from '@app/web/prismaClient'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { getStructureEmployeuseAddress } from '@app/web/structure/getStructureEmployeuseAddress'
import { getContractInfo } from '@app/web/conseiller-numerique/getContractInfo'
import { getLieuxActivites } from '@app/web/lieu-activite/getLieuxActivites'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { getTotalCountsStats } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getTotalCountsStats'

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

export const getMediateurPageData = async (
  mediateurId: string,
  coordinateurId?: string,
) => {
  const user = await authenticateUser()

  if (coordinateurId != null && user.mediateur?.id != null) {
    const mediateursCoordonnes = await coordinationFor(coordinateurId)([
      mediateurId,
      user.mediateur.id,
    ])

    if (mediateursCoordonnes.some(isNull)) return null
  }

  if (
    coordinateurId == null &&
    (user.coordinateur == null ||
      !user.coordinateur.mediateursCoordonnes
        .map(({ mediateurId: id }) => id)
        .includes(mediateurId))
  )
    return null

  const mediateur = await prismaClient.mediateur.findUnique({
    where: { id: mediateurId },
    select: {
      id: true,
      user: {
        select: { id: true, name: true, email: true, phone: true },
      },
      conseillerNumerique: {
        select: { id: true },
      },
    },
  })

  if (mediateur == null) return null

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
