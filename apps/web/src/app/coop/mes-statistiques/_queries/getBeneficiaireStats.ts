import { prismaClient } from '@app/web/prismaClient'
import {
  genreLabels,
  statutSocialLabels,
  trancheAgeLabels,
} from '@app/web/beneficiaire/beneficiaire'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
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

export const getBeneficiaireStats = async ({
  mediateurId,
  activitesFilters,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
}) =>
  prismaClient.$queryRaw<BeneficiaireQuantifiedShare[]>`
      WITH total_count AS (
          SELECT COUNT(*)::integer AS total
          FROM beneficiaires
          WHERE mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
      ),
           categorized_data AS (
               SELECT
                   'genresBeneficiaires' AS category_type,
                   CASE
                       WHEN genre = 'masculin' THEN 'Masculin'
                       WHEN genre = 'feminin' THEN 'Féminin'
                       ELSE 'Non communiqué'
                       END AS category,
                   COUNT(*)::integer AS count
               FROM beneficiaires
               WHERE mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
               GROUP BY category
               UNION ALL
               SELECT
                   'statusBeneficiaires' AS category_type,
                   CASE
                       WHEN "statutSocial" = 'scolarise' THEN 'Scolarisé'
                       WHEN "statutSocial" = 'sans_emploi' THEN 'Sans emploi'
                       WHEN "statutSocial" = 'en_emploi' THEN 'En emploi'
                       WHEN "statutSocial" = 'retraite' THEN 'Retraité'
                       ELSE 'Non communiqué ou hétérogène'
                       END AS category,
                   COUNT(*)::integer AS count
               FROM beneficiaires
               WHERE mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
               GROUP BY category
               UNION ALL
               SELECT
                   'tranchesAgeBeneficiaires' AS category_type,
                   CASE
                       WHEN "trancheAge" = 'mineur' THEN 'Mineur'
                       WHEN "trancheAge" = '18-24' THEN '18 - 24 ans'
                       WHEN "trancheAge" = '25-39' THEN '25 - 39 ans'
                       WHEN "trancheAge" = '40-59' THEN '40 - 59 ans'
                       WHEN "trancheAge" = '60-69' THEN '60 - 69 ans'
                       WHEN "trancheAge" = '70+' THEN '70 ans et plus'
                       ELSE 'Non communiqué'
                       END AS category,
                   COUNT(*)::integer AS count
               FROM beneficiaires
               WHERE mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
               GROUP BY category
               UNION ALL
               SELECT 'communesBeneficiaires' AS category_type,
                   COALESCE("commune", 'Non communiqué') AS category,
                   COUNT(*)::integer AS count
               FROM beneficiaires
               WHERE mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
               GROUP BY category
           )
      SELECT
          category_type,
          category AS label,
          count
      FROM categorized_data, total_count AS total;
  `

export const getBeneficiairesAnonymesStats = async ({
  mediateurId,
  activitesFilters,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
}) =>
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
          FROM cras_collectifs cc
              JOIN participants_anonymes_cras_collectifs pac
                  ON cc.participants_anonymes_id = pac.id
          WHERE cc.cree_par_mediateur_id = ${mediateurId}::UUID AND cc.suppression IS NULL
      )
      SELECT
          'genresBeneficiaires' AS category_type,
          'Féminin' AS label,
          COALESCE(genre_feminin, 0)::integer AS count
      FROM total_participants
      UNION ALL
      SELECT
          'genresBeneficiaires' AS category_type,
          'Masculin' AS label,
          COALESCE(genre_masculin, 0)::integer AS count
      FROM total_participants
      UNION ALL
      SELECT
          'genresBeneficiaires' AS category_type,
          'Non communiqué' AS label,
          COALESCE(genre_non_communique, 0)::integer AS count
      FROM total_participants
      UNION ALL
      SELECT
          'tranchesAgeBeneficiaires' AS category_type,
          'Mineur' AS label,
          COALESCE(tranche_age_mineur, 0)::integer AS count
      FROM total_participants
      UNION ALL
      SELECT
          'tranchesAgeBeneficiaires' AS category_type,
          '18 - 24 ans' AS label,
          COALESCE(tranche_age_18_24, 0)::integer AS count
      FROM total_participants
      UNION ALL
      SELECT
          'tranchesAgeBeneficiaires' AS category_type,
          '25 - 39 ans' AS label,
          COALESCE(tranche_age_25_39, 0)::integer AS count
      FROM total_participants
      UNION ALL
      SELECT
          'tranchesAgeBeneficiaires' AS category_type,
          '40 - 59 ans' AS label,
          COALESCE(tranche_age_40_59, 0)::integer AS count
      FROM total_participants
      UNION ALL
      SELECT
          'tranchesAgeBeneficiaires' AS category_type,
          '60 - 69 ans' AS label,
          COALESCE(tranche_age_60_69, 0)::integer AS count
      FROM total_participants
      UNION ALL
      SELECT
          'tranchesAgeBeneficiaires' AS category_type,
          '70 ans et plus' AS label,
          COALESCE(tranche_age_70_plus, 0)::integer AS count
      FROM total_participants
      UNION ALL
      SELECT
          'tranchesAgeBeneficiaires' AS category_type,
          'Non communiqué' AS label,
          COALESCE(tranche_age_non_communique, 0)::integer AS count
      FROM total_participants
      UNION ALL
      SELECT
          'statusBeneficiaires' AS category_type,
          'Scolarisé' AS label,
          COALESCE(statut_social_scolarise, 0)::integer AS count
      FROM total_participants
      UNION ALL
      SELECT
          'statusBeneficiaires' AS category_type,
          'Sans emploi' AS label,
          COALESCE(statut_social_sans_emploi, 0)::integer AS count
      FROM total_participants
      UNION ALL
      SELECT
          'statusBeneficiaires' AS category_type,
          'En emploi' AS label,
          COALESCE(statut_social_en_emploi, 0)::integer AS count
      FROM total_participants
      UNION ALL
      SELECT
          'statusBeneficiaires' AS category_type,
          'Retraité' AS label,
          COALESCE(statut_social_retraite, 0)::integer AS count
      FROM total_participants
      UNION ALL
      SELECT
          'statusBeneficiaires' AS category_type,
          'Non communiqué ou hétérogène' AS label,
          COALESCE(statut_social_non_communique, 0)::integer AS count
      FROM total_participants;`

export const EMPTY_BENEFICIAIRE_DATA: Record<
  BeneficiaireCategory,
  QuantifiedShare[]
> = {
  genresBeneficiaires: Object.values(genreLabels).map((label) => ({
    label,
    count: 0,
    proportion: 0,
  })),
  statusBeneficiaires: Object.values(statutSocialLabels).map((label) => ({
    label,
    count: 0,
    proportion: 0,
  })),
  tranchesAgeBeneficiaires: Object.values(trancheAgeLabels).map((label) => ({
    label,
    count: 0,
    proportion: 0,
  })),
  communesBeneficiaires: [],
}
