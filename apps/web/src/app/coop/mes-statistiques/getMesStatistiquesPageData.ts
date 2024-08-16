import { getAccompagnementsCountByMonth } from './_queries/getAccompagnementsCountByMonth'
import {
  getAccompagnementCollectifsStats,
  getAccompagnementDemarchesStats,
  getAccompagnementIndividuelsStats,
} from './_queries/getAccompagnementStats'
import { getAteliersCollectifsParticipants } from './_queries/getAteliersCollectifsParticipants'
import { getBeneficiaireStats } from './_queries/getBeneficiaireStats'
import {
  getAccompagnementBeneficiaires,
  getModalitesAccompagnementStats,
  toModalitesWithParticipantsCount,
} from './_queries/getModalitesAccompagnementStats'
import { getBeneficiairesAnonymesStats } from './_queries/getBeneficiairesAnonymesStats'
import { mergeQuantifiedShare } from './quantifiedShare'

export const getMesStatistiquesPageData = async (mediateurId: string) => {
  const modalitesAccompagnement =
    await getModalitesAccompagnementStats(mediateurId)

  const beneficiaireStats = await getBeneficiaireStats(mediateurId)

  const beneficiairesAnonymesStats =
    await getBeneficiairesAnonymesStats(mediateurId)

  const participantsAteliersCount =
    await getAteliersCollectifsParticipants(mediateurId)

  return {
    nombreAccompagnements: await getAccompagnementsCountByMonth(mediateurId),
    accompagnementBeneficiaires: getAccompagnementBeneficiaires(
      modalitesAccompagnement,
      mergeQuantifiedShare(beneficiaireStats),
      mergeQuantifiedShare(beneficiairesAnonymesStats),
    ),
    modalitesAccompagnement: modalitesAccompagnement.map(
      toModalitesWithParticipantsCount(
        participantsAteliersCount,
        beneficiairesAnonymesStats,
      ),
    ),
    ...mergeQuantifiedShare(beneficiaireStats, beneficiairesAnonymesStats),
    ...mergeQuantifiedShare(
      await getAccompagnementIndividuelsStats(mediateurId),
      await getAccompagnementDemarchesStats(mediateurId),
      await getAccompagnementCollectifsStats(mediateurId),
    ),
  }
}

export type MesStatistiquesPageData = Awaited<
  ReturnType<typeof getMesStatistiquesPageData>
>
