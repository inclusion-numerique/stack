import { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { getFiltersOptionsForMediateur } from '@app/web/components/filters/getFiltersOptionsForMediateur'
import {
  getAccompagnementsCountByDay,
  getAccompagnementsCountByMonth,
} from '@app/web/app/coop/mes-statistiques/_queries/getAccompagnementsCountByPeriod'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import {
  getActivitesStats,
  getActivitesStructuresStats,
} from '@app/web/app/coop/mes-statistiques/_queries/getActivitesStats'
import { getBeneficiaireStats } from './_queries/getBeneficiaireStats'
import { getTotalCountsStats } from './_queries/getTotalCountsStats'

export type MesStatistiquesGraphOptions = {
  fin?: Date
}

export const getMesStatistiquesPageData = async ({
  mediateurIds,
  activitesFilters,
  graphOptions = {},
}: {
  mediateurIds: string[]
  activitesFilters: ActivitesFilters
  graphOptions?: MesStatistiquesGraphOptions
}) => {
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
    getBeneficiaireStats({
      mediateurIds,
      activitesFilters,
    }),
    getActivitesStats({
      mediateurIds,
      activitesFilters,
    }),
    getActivitesStructuresStats({
      mediateurIds,
      activitesFilters,
    }),
    getTotalCountsStats({
      mediateurIds,
      activitesFilters,
    }),
  ])

  const {
    communesOptions,
    departementsOptions,
    initialBeneficiairesOptions,
    lieuxActiviteOptions,
    activiteDates,
  } = await getFiltersOptionsForMediateur({
    mediateurIds,
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
    initialBeneficiairesOptions,
    lieuxActiviteOptions,
    activiteDates,
  }
}

export type MesStatistiquesPageData = Awaited<
  ReturnType<typeof getMesStatistiquesPageData>
>
