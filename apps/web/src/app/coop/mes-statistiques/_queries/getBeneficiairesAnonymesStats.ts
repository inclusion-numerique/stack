import { prismaClient } from '@app/web/prismaClient'
import { QuantifiedShare } from '../quantifiedShare'

const beneficiaireCategories = [
  'genresBeneficiaires',
  'statusBeneficiaires',
  'tranchesAgeBeneficiaires',
  'communesBeneficiaires',
] as const

type BeneficiaireCategory = (typeof beneficiaireCategories)[number]

export type BeneficiaireQuantifiedShare = QuantifiedShare & {
  category_type: BeneficiaireCategory
}

export const getBeneficiairesAnonymesStats = async (mediateurId: string) =>
  prismaClient.$queryRaw<BeneficiaireQuantifiedShare[]>`
      WITH total_participants AS (
          SELECT
              (SUM(pac.genre_feminin)) AS genre_feminin,
              (SUM(pac.genre_masculin)) AS genre_masculin,
              (SUM(pac.genre_non_communique)) AS genre_non_communique,
              (SUM(pac.tranche_age_mineur)) AS tranche_age_mineur,
              (SUM(pac.tranche_age_18_24)) AS tranche_age_18_24,
              (SUM(pac.tranche_age_25_39)) AS tranche_age_25_39,
              (SUM(pac.tranche_age_40_59)) AS tranche_age_40_59,
              (SUM(pac.tranche_age_60_69)) AS tranche_age_60_69,
              (SUM(pac.tranche_age_70_plus)) AS tranche_age_70_plus,
              (SUM(pac.tranche_age_non_communique)) AS tranche_age_non_communique,
              (SUM(pac.statut_social_scolarise)) AS statut_social_scolarise,
              (SUM(pac.statut_social_sans_emploi)) AS statut_social_sans_emploi,
              (SUM(pac.statut_social_en_emploi)) AS statut_social_en_emploi,
              (SUM(pac.statut_social_retraite)) AS statut_social_retraite,
              (SUM(pac.statut_social_non_communique)) AS statut_social_non_communique,
              (SUM(pac.total)) AS total
          FROM "coop-mediation-numerique".public.cras_collectifs cc
                   JOIN "coop-mediation-numerique".public.participants_anonymes_cras_collectifs pac
                        ON cc.participants_anonymes_id = pac.id
          WHERE cc.cree_par_mediateur_id = ${mediateurId}::UUID AND cc.suppression IS NULL
      )
      SELECT
          'genresBeneficiaires' AS category_type,
          'Féminin' AS label,
          COALESCE(genre_feminin, 0)::integer AS count,
          COALESCE(ROUND(genre_feminin * 100.0 / total), 0)::integer AS proportion
      FROM total_participants
      UNION ALL
      SELECT
          'genresBeneficiaires' AS category_type,
          'Masculin' AS label,
          COALESCE(genre_masculin, 0)::integer AS count,
          COALESCE(ROUND(genre_masculin * 100.0 / total), 0)::integer AS proportion
      FROM total_participants
      UNION ALL
      SELECT
          'genresBeneficiaires' AS category_type,
          'Non communiqué' AS label,
          COALESCE(genre_non_communique, 0)::integer AS count,
          COALESCE(ROUND(genre_non_communique * 100.0 / total), 0)::integer AS proportion
      FROM total_participants
      UNION ALL
      SELECT
          'tranchesAgeBeneficiaires' AS category_type,
          'Mineur' AS label,
          COALESCE(tranche_age_mineur, 0)::integer AS count,
          COALESCE(ROUND(tranche_age_mineur * 100.0 / total), 0)::integer AS proportion
      FROM total_participants
      UNION ALL
      SELECT
          'tranchesAgeBeneficiaires' AS category_type,
          '18-24' AS label,
          COALESCE(tranche_age_18_24, 0)::integer AS count,
          COALESCE(ROUND(tranche_age_18_24 * 100.0 / total), 0)::integer AS proportion
      FROM total_participants
      UNION ALL
      SELECT
          'tranchesAgeBeneficiaires' AS category_type,
          '25-39' AS label,
          COALESCE(tranche_age_25_39, 0)::integer AS count,
          COALESCE(ROUND(tranche_age_25_39 * 100.0 / total), 0)::integer AS proportion
      FROM total_participants
      UNION ALL
      SELECT
          'tranchesAgeBeneficiaires' AS category_type,
          '40-59' AS label,
          COALESCE(tranche_age_40_59, 0)::integer AS count,
          COALESCE(ROUND(tranche_age_40_59 * 100.0 / total), 0)::integer AS proportion
      FROM total_participants
      UNION ALL
      SELECT
          'tranchesAgeBeneficiaires' AS category_type,
          '60-69' AS label,
          COALESCE(tranche_age_60_69, 0)::integer AS count,
          COALESCE(ROUND(tranche_age_60_69 * 100.0 / total), 0)::integer AS proportion
      FROM total_participants
      UNION ALL
      SELECT
          'tranchesAgeBeneficiaires' AS category_type,
          '70+' AS label,
          COALESCE(tranche_age_70_plus, 0)::integer AS count,
          COALESCE(ROUND(tranche_age_70_plus * 100.0 / total), 0)::integer AS proportion
      FROM total_participants
      UNION ALL
      SELECT
          'tranchesAgeBeneficiaires' AS category_type,
          'Non communiqué' AS label,
          COALESCE(tranche_age_non_communique, 0)::integer AS count,
          COALESCE(ROUND(tranche_age_non_communique * 100.0 / total), 0)::integer AS proportion
      FROM total_participants
      UNION ALL
      SELECT
          'statusBeneficiaires' AS category_type,
          'Scolarisé' AS label,
          COALESCE(statut_social_scolarise, 0)::integer AS count,
          COALESCE(ROUND(statut_social_scolarise * 100.0 / total), 0)::integer AS proportion
      FROM total_participants
      UNION ALL
      SELECT
          'statusBeneficiaires' AS category_type,
          'Sans emploi' AS label,
          COALESCE(statut_social_sans_emploi, 0)::integer AS count,
          COALESCE(ROUND(statut_social_sans_emploi * 100.0 / total), 0)::integer AS proportion
      FROM total_participants
      UNION ALL
      SELECT
          'statusBeneficiaires' AS category_type,
          'En emploi' AS label,
          COALESCE(statut_social_en_emploi, 0)::integer AS count,
          COALESCE(ROUND(statut_social_en_emploi * 100.0 / total), 0)::integer AS proportion
      FROM total_participants
      UNION ALL
      SELECT
          'statusBeneficiaires' AS category_type,
          'Retraité' AS label,
          COALESCE(statut_social_retraite, 0)::integer AS count,
          COALESCE(ROUND(statut_social_retraite * 100.0 / total), 0)::integer AS proportion
      FROM total_participants
      UNION ALL
      SELECT
          'statusBeneficiaires' AS category_type,
          'Non communiqué' AS label,
          COALESCE(statut_social_non_communique, 0)::integer AS count,
          COALESCE(ROUND(statut_social_non_communique * 100.0 / total), 0)::integer AS proportion
      FROM total_participants;
  `
