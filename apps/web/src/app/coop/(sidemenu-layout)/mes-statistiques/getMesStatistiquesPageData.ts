import { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { getFiltersOptionsForMediateur } from '@app/web/components/filters/getFiltersOptionsForMediateur'
import {
  getAccompagnementsCountByDay,
  getAccompagnementsCountByMonth,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getAccompagnementsCountByPeriod'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import {
  getActivitesStats,
  getActivitesStructuresStats,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getActivitesStats'
import { UserDisplayName, UserProfile } from '@app/web/utils/user'
import { getBeneficiaireStatsWithCommunes } from './_queries/getBeneficiaireStats'
import { getTotalCountsStats } from './_queries/getTotalCountsStats'

export type MesStatistiquesGraphOptions = {
  fin?: Date
}

export const getMesStatistiquesPageData = async ({
  user,
  mediateurCoordonnesIds,
  activitesFilters,
  graphOptions = {},
}: {
  user: UserDisplayName & UserProfile
  mediateurCoordonnesIds?: string[]
  activitesFilters: ActivitesFilters
  graphOptions?: MesStatistiquesGraphOptions
}) => {
  const mediateurIds = [
    ...(user.mediateur?.id ? [user.mediateur.id] : []),
    ...(mediateurCoordonnesIds ?? []),
  ]

  const [
    accompagnementsParJour,
    accompagnementsParMois,
    beneficiaires,
    activites,
    structures,
    totalCounts,
  ] = await Promise.all([
    getAccompagnementsCountByDay({
      mediateurIds,
      activitesFilters,
      periodEnd: graphOptions.fin ? dateAsIsoDay(graphOptions.fin) : undefined,
    }),
    getAccompagnementsCountByMonth({
      mediateurIds,
      activitesFilters,
      periodEnd: graphOptions.fin ? dateAsIsoDay(graphOptions.fin) : undefined,
    }),
    getBeneficiaireStatsWithCommunes({ mediateurIds, activitesFilters }),
    getActivitesStats({ mediateurIds, activitesFilters }),
    getActivitesStructuresStats({ mediateurIds, activitesFilters }),
    getTotalCountsStats({ mediateurIds, activitesFilters }),
  ])

  const {
    communesOptions,
    departementsOptions,
    initialMediateursOptions,
    initialBeneficiairesOptions,
    lieuxActiviteOptions,
    activiteDates,
  } = await getFiltersOptionsForMediateur({
    user,
    mediateurCoordonnesIds,
    includeBeneficiaireId: activitesFilters.beneficiaire,
  })

  return {
    totalCounts,
    accompagnementsParMois,
    accompagnementsParJour,
    beneficiaires,
    activites,
    structures,
    activitesFilters,
    communesOptions,
    departementsOptions,
    initialMediateursOptions,
    initialBeneficiairesOptions,
    lieuxActiviteOptions,
    activiteDates,
  }
}

export type MesStatistiquesPageData = Awaited<
  ReturnType<typeof getMesStatistiquesPageData>
>
