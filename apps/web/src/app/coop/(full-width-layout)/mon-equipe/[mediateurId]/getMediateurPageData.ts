import { prismaClient } from '@app/web/prismaClient'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { getStructureEmployeuseAddress } from '@app/web/structure/getStructureEmployeuseAddress'
import { getContractInfo } from '@app/web/conseiller-numerique/getContractInfo'
import { getLieuxActivites } from '@app/web/lieu-activite/getLieuxActivites'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { getTotalCountsStats } from '../../../(sidemenu-layout)/mes-statistiques/_queries/getTotalCountsStats'

const activitesFiltersLastDays = (daysCount: number) => {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() - daysCount)
  const activitesFilters: ActivitesFilters = {
    du: currentDate.toISOString().split('T')[0],
    au: new Date().toISOString().split('T')[0],
  }
  return activitesFilters
}

export const getMediateurPageData = async (mediateurId: string) => {
  const user = await getAuthenticatedSessionUser()

  if (
    user.coordinateur?.mediateursCoordonnes
      .map(({ mediateurId: id }) => id)
      .includes(mediateurId) === false
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
