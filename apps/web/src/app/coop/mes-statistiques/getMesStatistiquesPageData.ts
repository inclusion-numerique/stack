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

export const getMesStatistiquesPageData = async (mediateurId: string) => {
  const modalitesAccompagnement =
    await getModalitesAccompagnementStats(mediateurId)

  const beneficiaireStats = await getBeneficiaireStats(mediateurId)

  const beneficiairesAnonymesStats =
    await getBeneficiairesAnonymesStats(mediateurId)

  return {
    nombreAccompagnementsParJour:
      await getAccompagnementsCountByDay(mediateurId),
    nombreAccompagnementsParMois:
      await getAccompagnementsCountByMonth(mediateurId),
    accompagnementBeneficiaires: getAccompagnementBeneficiaires(
      modalitesAccompagnement,
      mergeQuantifiedShare(EMPTY_BENEFICIAIRE_DATA, beneficiaireStats),
      mergeQuantifiedShare(EMPTY_BENEFICIAIRE_DATA, beneficiairesAnonymesStats),
    ),
    modalitesAccompagnement: withProportions(modalitesAccompagnement),
    ...mergeQuantifiedShare(
      EMPTY_BENEFICIAIRE_DATA,
      beneficiaireStats,
      beneficiairesAnonymesStats,
    ),
    ...mergeQuantifiedShare(
      EMPTY_ACCOMPAGNEMENT_DATA,
      await getAccompagnementIndividuelsStats(mediateurId),
      await getAccompagnementDemarchesStats(mediateurId),
      await getAccompagnementCollectifsStats(mediateurId),
    ),
  }
}

export type MesStatistiquesPageData = Awaited<
  ReturnType<typeof getMesStatistiquesPageData>
>
