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
  mediateurCoordonnesIds,
  activitesFilters,
  graphOptions = {},
}: {
  mediateurId?: string
  mediateurCoordonnesIds: string[]
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
      mediateurIds: mediateurCoordonnesIds,
      activitesFilters,
      periodEnd: graphOptions.fin ? dateAsIsoDay(graphOptions.fin) : undefined,
    }),
    getAccompagnementsCountByMonth({
      mediateurIds: mediateurCoordonnesIds,
      activitesFilters,
      periodEnd: graphOptions.fin ? dateAsIsoDay(graphOptions.fin) : undefined,
    }),
    getBeneficiaireStats({
      mediateurIds: mediateurCoordonnesIds,
      activitesFilters,
    }),
    getActivitesStats({
      mediateurIds: mediateurCoordonnesIds,
      activitesFilters,
    }),
    getActivitesStructuresStats({
      mediateurIds: mediateurCoordonnesIds,
      activitesFilters,
    }),
    getTotalCountsStats({
      mediateurIds: mediateurCoordonnesIds,
      activitesFilters,
    }),
  ])

  const {
    communesOptions,
    departementsOptions,
    initialMediateursOptions,
    initialBeneficiairesOptions,
    lieuxActiviteOptions,
    activiteDates,
  } = await getFiltersOptionsForMediateur({
    mediateurId,
    mediateurIds: mediateurCoordonnesIds,
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
