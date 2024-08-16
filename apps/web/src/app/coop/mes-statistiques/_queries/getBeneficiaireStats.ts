import { prismaClient } from '@app/web/prismaClient'
import { QuantifiedShare } from '../quantifiedShare'

const beneficiaireCategories = [
  'genresBeneficiaires',
  'statusBeneficiaires',
  'tranchesAgeBeneficiaires',
  'communesBeneficiaires',
] as const

type BeneficiaireCategory = (typeof beneficiaireCategories)[number]

type BeneficiaireQuantifiedShare = QuantifiedShare & {
  category_type: BeneficiaireCategory
}

export const getBeneficiaireStats = async (mediateurId: string) =>
  prismaClient.$queryRaw<BeneficiaireQuantifiedShare[]>`
      WITH total_count AS (
          SELECT COUNT(*)::integer AS total
          FROM "coop-mediation-numerique".public.beneficiaires
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
               FROM "coop-mediation-numerique".public.beneficiaires
               WHERE mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
               GROUP BY category
               UNION ALL
               SELECT
                   'statusBeneficiaires' AS category_type,
                   CASE
                       WHEN "statutSocial" = 'scolarise' THEN 'Scolaire'
                       WHEN "statutSocial" = 'sans_emploi' THEN 'Sans emploi'
                       WHEN "statutSocial" = 'en_emploi' THEN 'En emploi'
                       WHEN "statutSocial" = 'retraite' THEN 'Retraité'
                       ELSE 'Non communiqué'
                       END AS category,
                   COUNT(*)::integer AS count
               FROM "coop-mediation-numerique".public.beneficiaires
               WHERE mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
               GROUP BY category
               UNION ALL
               SELECT
                   'tranchesAgeBeneficiaires' AS category_type,
                   CASE
                       WHEN "trancheAge" = 'mineur' THEN 'mineur'
                       WHEN "trancheAge" = '18-24' THEN '18-24'
                       WHEN "trancheAge" = '25-39' THEN '25-39'
                       WHEN "trancheAge" = '40-59' THEN '40-59'
                       WHEN "trancheAge" = '60-69' THEN '60-69'
                       WHEN "trancheAge" = '70+' THEN '70+'
                       ELSE 'Non communiqué'
                       END AS category,
                   COUNT(*)::integer AS count
               FROM "coop-mediation-numerique".public.beneficiaires
               WHERE mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
               GROUP BY category
               UNION ALL
               SELECT 'communesBeneficiaires' AS category_type,
                   COALESCE("commune", 'Non communiqué') AS category,
                   COUNT(*)::integer AS count
               FROM "coop-mediation-numerique".public.beneficiaires
               WHERE mediateur_id = ${mediateurId}::UUID AND suppression IS NULL
               GROUP BY category
           )
      SELECT
          category_type,
          category AS label,
          count
      FROM categorized_data, total_count AS total;
  `
