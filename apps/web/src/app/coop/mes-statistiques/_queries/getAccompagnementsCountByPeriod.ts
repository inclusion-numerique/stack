import { prismaClient } from '@app/web/prismaClient'
import { QuantifiedShare } from '../quantifiedShare'

export const getAccompagnementsCountByMonth = async (mediateurId: string) =>
  prismaClient.$queryRaw<QuantifiedShare[]>`
      WITH months AS (
          SELECT
              generate_series(
                      DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '8 months',
                      DATE_TRUNC('month', CURRENT_DATE),
                      '1 month'
              ) AS month
      ),
           combined_totals AS (
               SELECT
                   DATE_TRUNC('month', "date") AS month,
                   COUNT(*)::integer AS total
               FROM (
                        SELECT "date" FROM cras_individuels
                        WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL AND "date" >= (CURRENT_DATE - INTERVAL '9 months')
                        UNION ALL
                        SELECT "date" FROM cras_collectifs
                        WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL AND "date" >= (CURRENT_DATE - INTERVAL '9 months')
                        UNION ALL
                        SELECT "date" FROM cras_demarches_administratives
                        WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL AND "date" >= (CURRENT_DATE - INTERVAL '9 months')
                    ) AS all_dates
               GROUP BY month
           )
      SELECT
          TO_CHAR(m.month, 'TMMonth') AS month_name,
          CASE
              WHEN TO_CHAR(m.month, 'TMMonth') = 'January' THEN 'Jan.'
              WHEN TO_CHAR(m.month, 'TMMonth') = 'February' THEN 'Fév.'
              WHEN TO_CHAR(m.month, 'TMMonth') = 'March' THEN 'Mars'
              WHEN TO_CHAR(m.month, 'TMMonth') = 'April' THEN 'Avr.'
              WHEN TO_CHAR(m.month, 'TMMonth') = 'May' THEN 'Mai'
              WHEN TO_CHAR(m.month, 'TMMonth') = 'June' THEN 'Juin'
              WHEN TO_CHAR(m.month, 'TMMonth') = 'July' THEN 'Juil.'
              WHEN TO_CHAR(m.month, 'TMMonth') = 'August' THEN 'Août'
              WHEN TO_CHAR(m.month, 'TMMonth') = 'September' THEN 'Sep.'
              WHEN TO_CHAR(m.month, 'TMMonth') = 'October' THEN 'Oct.'
              WHEN TO_CHAR(m.month, 'TMMonth') = 'November' THEN 'Nov.'
              WHEN TO_CHAR(m.month, 'TMMonth') = 'December' THEN 'Déc.'
              ELSE TO_CHAR(m.month, 'TMMonth')
              END AS label,
          COALESCE(ct.total, 0) AS count,
          0::integer AS proportion
      FROM months m
               LEFT JOIN combined_totals ct ON m.month = ct.month
      ORDER BY m.month;
  `

export const getAccompagnementsCountByDay = async (mediateurId: string) =>
  prismaClient.$queryRaw<QuantifiedShare[]>`
      WITH days AS (
          SELECT
              generate_series(
                      DATE_TRUNC('day', CURRENT_DATE) - INTERVAL '24 days',
                      DATE_TRUNC('day', CURRENT_DATE),
                      '1 day'
              ) AS day
      ),
      combined_totals AS (
          SELECT
              DATE_TRUNC('day', "date") AS day,
              COUNT(*)::integer AS total
          FROM (
                   SELECT "date" FROM cras_individuels
                   WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL AND "date" >= (CURRENT_DATE - INTERVAL '25 days')
                   UNION ALL
                   SELECT "date" FROM cras_collectifs
                   WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL AND "date" >= (CURRENT_DATE - INTERVAL '25 days')
                   UNION ALL
                   SELECT "date" FROM cras_demarches_administratives
                   WHERE cree_par_mediateur_id = ${mediateurId}::UUID AND suppression IS NULL AND "date" >= (CURRENT_DATE - INTERVAL '25 days')
               ) AS all_dates
          GROUP BY day
      )
      SELECT
          TO_CHAR(d.day, 'DD/MM') AS day_name,
          TO_CHAR(d.day, 'DD/MM') AS label,
          COALESCE(ct.total, 0) AS count,
          0::integer AS proportion
      FROM days d
               LEFT JOIN combined_totals ct ON d.day = ct.day
      ORDER BY d.day;
  `
