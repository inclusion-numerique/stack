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
  mediateurId,
  activitesFilters,
  graphOptions = {},
}: {
  mediateurId: string
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
      mediateurId,
      activitesFilters,
      periodEnd: graphOptions.fin ? dateAsIsoDay(graphOptions.fin) : undefined,
    }),
    getAccompagnementsCountByMonth({
      mediateurId,
      activitesFilters,
      periodEnd: graphOptions.fin ? dateAsIsoDay(graphOptions.fin) : undefined,
    }),
    getBeneficiaireStats({
      mediateurId,
      activitesFilters,
    }),
    getActivitesStats({
      mediateurId,
      activitesFilters,
    }),
    getActivitesStructuresStats({
      mediateurId,
      activitesFilters,
    }),
    getTotalCountsStats({
      mediateurId,
      activitesFilters,
    }),
  ])

  const {
    communesOptions,
    departementsOptions,
    initialBeneficiairesOptions,
    lieuxActiviteOptions,
  } = await getFiltersOptionsForMediateur({
    mediateurId,
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
  }
}

export type MesStatistiquesPageData = Awaited<
  ReturnType<typeof getMesStatistiquesPageData>
>
