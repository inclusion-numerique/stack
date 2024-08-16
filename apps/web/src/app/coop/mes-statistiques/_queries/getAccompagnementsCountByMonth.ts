import { prismaClient } from '@app/web/prismaClient'
import { QuantifiedShare } from '../quantifiedShare'

export const getAccompagnementsCountByMonth = async (mediateurId: string) =>
  prismaClient.$queryRaw<QuantifiedShare[]>`
      WITH combined_totals AS (
          SELECT
              DATE_TRUNC('month', "date") AS month,
              COUNT(*)::integer AS total
          FROM (
                   SELECT "date" FROM "coop-mediation-numerique".public.cras_individuels
                   WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL AND "date" >= (CURRENT_DATE - INTERVAL '9 months')
                   UNION ALL
                   SELECT "date" FROM "coop-mediation-numerique".public.cras_collectifs
                   WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL AND "date" >= (CURRENT_DATE - INTERVAL '9 months')
                   UNION ALL
                   SELECT "date" FROM "coop-mediation-numerique".public.cras_demarches_administratives
                   WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL AND "date" >= (CURRENT_DATE - INTERVAL '9 months')
               ) AS all_dates
          GROUP BY month
          ORDER BY month
      )
      SELECT
          TO_CHAR(month, 'TMMonth') AS month_name,
          CASE
              WHEN TO_CHAR(month, 'TMMonth') = 'January' THEN 'Jan.'
              WHEN TO_CHAR(month, 'TMMonth') = 'February' THEN 'Fév.'
              WHEN TO_CHAR(month, 'TMMonth') = 'March' THEN 'Mars'
              WHEN TO_CHAR(month, 'TMMonth') = 'April' THEN 'Avr.'
              WHEN TO_CHAR(month, 'TMMonth') = 'May' THEN 'Mai'
              WHEN TO_CHAR(month, 'TMMonth') = 'June' THEN 'Juin'
              WHEN TO_CHAR(month, 'TMMonth') = 'July' THEN 'Juil.'
              WHEN TO_CHAR(month, 'TMMonth') = 'August' THEN 'Août'
              WHEN TO_CHAR(month, 'TMMonth') = 'September' THEN 'Sep.'
              WHEN TO_CHAR(month, 'TMMonth') = 'October' THEN 'Oct.'
              WHEN TO_CHAR(month, 'TMMonth') = 'November' THEN 'Nov.'
              WHEN TO_CHAR(month, 'TMMonth') = 'December' THEN 'Déc.'
              ELSE TO_CHAR(month, 'TMMonth')
              END AS label,
          total AS count,
          0::integer AS proportion
      FROM combined_totals;
  `
