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
import {
  EMPTY_BENEFICIAIRE_DATA,
  getBeneficiaireStats,
} from './_queries/getBeneficiaireStats'
import { getAccompagnementStats } from './_queries/getAccompagnementStats'

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
  console.log('EXECUTE modalitesAccompagnement QUERY')
  const modalitesAccompagnement = await getAccompagnementStats({
    mediateurId,
    activitesFilters,
  })

  console.log('MODALITES ACCOMPAGNEMENT', modalitesAccompagnement)

  const beneficiaireStats = await getBeneficiaireStats({
    mediateurId,
    activitesFilters,
  })

  console.log('BENEFICIAIRE STATS', beneficiaireStats)

  const accompagnementsParMois = await getAccompagnementsCountByMonth({
    mediateurId,
    activitesFilters,
    periodEnd: graphOptions.fin ? dateAsIsoDay(graphOptions.fin) : undefined,
  })

  console.log('ACCOMPAGNEMENTS PAR MOIS', accompagnementsParMois)

  const accompagnementsParJour = await getAccompagnementsCountByDay({
    mediateurId,
    activitesFilters,
    periodEnd: graphOptions.fin ? dateAsIsoDay(graphOptions.fin) : undefined,
  })

  console.log('ACCOMPAGNEMENTS PAR JOUR', accompagnementsParJour)

  const activitesStats = await getActivitesStats({
    mediateurId,
    activitesFilters,
  })

  console.log('ACTIVITES STATS', activitesStats)

  const activitesStructuresStats = await getActivitesStructuresStats({
    mediateurId,
    activitesFilters,
  })

  console.log('ACTIVITES STRUCTURES STATS', activitesStructuresStats)

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
    // nombreAccompagnementsParJour: await getAccompagnementsCountByDay({
    //   mediateurId,
    //   activitesFilters,
    //   periodEnd: graphOptions.fin ? dateAsIsoDay(graphOptions.fin) : undefined,
    // }),
    // nombreAccompagnementsParMois: await getAccompagnementsCountByMonth({
    //   mediateurId,
    //   activitesFilters,
    //   periodEnd: graphOptions.fin
    //     ? dateAsIsoMonth(graphOptions.fin)
    //     : undefined,
    // }),
    // accompagnementBeneficiaires: getAccompagnementBeneficiaires({
    //   mediateurId,
    //   activitesFilters,
    //   modalitesAccompagnement,
    //   beneficiaireStatsPageData: mergeQuantifiedShare(
    //     EMPTY_BENEFICIAIRE_DATA,
    //     beneficiaireStats,
    //   ),
    //   participantsAnonymesPageData: mergeQuantifiedShare(
    //     EMPTY_BENEFICIAIRE_DATA,
    //     beneficiairesAnonymesStats,
    //   ),
    // }),
    // modalitesAccompagnement: withProportions(modalitesAccompagnement).map(
    //   (item) => {
    //     // category_type remains but does not conform to tests and ui models
    //     // eslint-disable-next-line no-param-reassign
    //     delete (item as Record<string, unknown>).category_type
    //     return item
    //   },
    // ),
    // ...mergeQuantifiedShare(
    //   EMPTY_BENEFICIAIRE_DATA,
    //   beneficiaireStats,
    //   beneficiairesAnonymesStats,
    // ),
    // ...mergeQuantifiedShare(
    //   EMPTY_ACCOMPAGNEMENT_DATA,
    //   await getAccompagnementIndividuelsStats({
    //     mediateurId,
    //     activitesFilters,
    //   }),
    //   await getAccompagnementDemarchesStats({
    //     mediateurId,
    //     activitesFilters,
    //   }),
    //   await getAccompagnementCollectifsStats({
    //     mediateurId,
    //     activitesFilters,
    //   }),
    // ),
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

export const emptyMesStatistiquesPageData: MesStatistiquesPageData = {
  nombreAccompagnementsParJour: [],
  nombreAccompagnementsParMois: [],
  accompagnementBeneficiaires: {
    accompagnements: 0,
    beneficiaires: 0,
    anonymes: 0,
  },
  // ...EMPTY_ACCOMPAGNEMENT_DATA,
  modalitesAccompagnement: [],
  ...EMPTY_BENEFICIAIRE_DATA,
  communesOptions: [],
  departementsOptions: [],
  initialBeneficiairesOptions: [],
  lieuxActiviteOptions: [],
  activitesFilters: {},
}
