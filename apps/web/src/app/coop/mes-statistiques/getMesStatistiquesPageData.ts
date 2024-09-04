import { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import { getFiltersOptionsForMediateur } from '@app/web/components/filters/getFiltersOptionsForMediateur'
import {
  getAccompagnementsCountByDay,
  getAccompagnementsCountByMonth,
} from './_queries/getAccompagnementsCountByPeriod'
import {
  EMPTY_ACCOMPAGNEMENT_DATA,
  getAccompagnementCollectifsStats,
  getAccompagnementDemarchesStats,
  getAccompagnementIndividuelsStats,
} from './_queries/getAccompagnementStats'
import {
  EMPTY_BENEFICIAIRE_DATA,
  getBeneficiairesAnonymesStats,
  getBeneficiaireStats,
} from './_queries/getBeneficiaireStats'
import {
  getAccompagnementBeneficiaires,
  getModalitesAccompagnementStats,
} from './_queries/getModalitesAccompagnementStats'
import { mergeQuantifiedShare, withProportions } from './quantifiedShare'
import { dateAsIsoDay, dateAsIsoMonth } from '@app/web/utils/dateAsIsoDay'
import { prismaClient } from '@app/web/prismaClient'

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
  console.log('EXECUTE QUERY')
  const modalitesAccompagnement = await getModalitesAccompagnementStats({
    mediateurId,
    activitesFilters,
  })

  console.log(
    'ACTIVITES FOR',
    { mediateurId },
    await prismaClient.activite.findMany({
      where: {
        mediateurId,
      },
    }),
  )

  console.log('MODALITES ACCOMPAGNEMENT', modalitesAccompagnement)

  const beneficiaireStats = await getBeneficiaireStats({
    mediateurId,
    activitesFilters,
  })

  const beneficiairesAnonymesStats = await getBeneficiairesAnonymesStats({
    mediateurId,
    activitesFilters,
  })

  const {
    communesOptions,
    departementsOptions,
    initialBeneficiairesOptions,
    lieuxActiviteOptions,
  } = await getFiltersOptionsForMediateur({
    mediateurId,
  })

  return {
    nombreAccompagnementsParJour: await getAccompagnementsCountByDay({
      mediateurId,
      activitesFilters,
      periodEnd: graphOptions.fin ? dateAsIsoDay(graphOptions.fin) : undefined,
    }),
    nombreAccompagnementsParMois: await getAccompagnementsCountByMonth({
      mediateurId,
      activitesFilters,
      periodEnd: graphOptions.fin
        ? dateAsIsoMonth(graphOptions.fin)
        : undefined,
    }),
    accompagnementBeneficiaires: getAccompagnementBeneficiaires({
      mediateurId,
      activitesFilters,
      modalitesAccompagnement,
      beneficiaireStatsPageData: mergeQuantifiedShare(
        EMPTY_BENEFICIAIRE_DATA,
        beneficiaireStats,
      ),
      participantsAnonymesPageData: mergeQuantifiedShare(
        EMPTY_BENEFICIAIRE_DATA,
        beneficiairesAnonymesStats,
      ),
    }),
    modalitesAccompagnement: withProportions(modalitesAccompagnement).map(
      (item) => {
        // category_type remains but does not conform to tests and ui models
        // eslint-disable-next-line no-param-reassign
        delete (item as Record<string, unknown>).category_type
        return item
      },
    ),
    ...mergeQuantifiedShare(
      EMPTY_BENEFICIAIRE_DATA,
      beneficiaireStats,
      beneficiairesAnonymesStats,
    ),
    ...mergeQuantifiedShare(
      EMPTY_ACCOMPAGNEMENT_DATA,
      await getAccompagnementIndividuelsStats({
        mediateurId,
        activitesFilters,
      }),
      await getAccompagnementDemarchesStats({
        mediateurId,
        activitesFilters,
      }),
      await getAccompagnementCollectifsStats({
        mediateurId,
        activitesFilters,
      }),
    ),
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
  ...EMPTY_ACCOMPAGNEMENT_DATA,
  modalitesAccompagnement: [],
  ...EMPTY_BENEFICIAIRE_DATA,
  communesOptions: [],
  departementsOptions: [],
  initialBeneficiairesOptions: [],
  lieuxActiviteOptions: [],
  activitesFilters: {},
}
