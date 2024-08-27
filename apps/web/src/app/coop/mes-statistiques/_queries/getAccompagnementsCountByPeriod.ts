import { prismaClient } from '@app/web/prismaClient'
import { QuantifiedShare } from '../quantifiedShare'

export const getAccompagnementsCountByMonth = async (mediateurId: string) =>
  prismaClient.$queryRaw<QuantifiedShare[]>`
      WITH months AS (
          SELECT generate_series(
            DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '11 months',
            DATE_TRUNC('month', CURRENT_DATE),
            '1 month'::interval
          ) AS month
      ),
       activities_count AS (
          SELECT
           DATE_TRUNC('month', COALESCE(cra_individuel.date, cra_collectif.date, cra_demarche_administrative.date)) AS month_truncated,
               (
                   (SELECT COUNT(*)
                    FROM participants_ateliers_collectifs participants
                    WHERE participants.cra_collectif_id = cra_collectif.id) +
                   (SELECT COALESCE(SUM(participants_anonymes.total), 1)
                    FROM participants_anonymes_cras_collectifs participants_anonymes
                    WHERE participants_anonymes.id = cra_collectif.participants_anonymes_id)
               )::integer AS count
          FROM activites_mediateurs activite
              LEFT JOIN cras_individuels cra_individuel ON activite.cra_individuel_id = cra_individuel.id
              LEFT JOIN cras_collectifs cra_collectif ON activite.cra_collectif_id = cra_collectif.id
              LEFT JOIN cras_demarches_administratives cra_demarche_administrative
                  ON activite.cra_demarche_administrative_id = cra_demarche_administrative.id
              LEFT JOIN structures structure ON structure.id = COALESCE(
                  cra_individuel.lieu_activite_id,
                  cra_collectif.lieu_activite_id,
                  cra_demarche_administrative.lieu_activite_id
              )
              WHERE (activite.mediateur_id = ${mediateurId}::UUID OR ${mediateurId} = '_any_')
              AND (
                  (cra_individuel.suppression IS NULL AND cra_individuel.id IS NOT NULL)
                  OR (cra_collectif.suppression IS NULL AND cra_collectif.id IS NOT NULL)
                  OR (cra_demarche_administrative.suppression IS NULL AND cra_demarche_administrative.id IS NOT NULL)
              )
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
          COALESCE(SUM(ac.count), 0)::integer AS count,  -- Somme des comptes pour chaque mois, 0 si aucune activité
          0::integer AS proportion
      FROM months m
               LEFT JOIN activities_count ac ON m.month = ac.month_truncated
      GROUP BY m.month
      ORDER BY m.month;
  `

export const getAccompagnementsCountByDay = async (
  mediateurId: string,
) => prismaClient.$queryRaw<QuantifiedShare[]>`
    WITH days AS (
        SELECT generate_series(
            DATE_TRUNC('day', CURRENT_DATE) - INTERVAL '29 days',
            DATE_TRUNC('day', CURRENT_DATE),
            '1 day'::interval
        ) AS date
    ),
         activities_count AS (
             SELECT
                 DATE_TRUNC('day', COALESCE(cra_individuel.date, cra_collectif.date, cra_demarche_administrative.date)) AS date_truncated,
                 (
                     (SELECT COUNT(*)
                      FROM participants_ateliers_collectifs participants
                      WHERE participants.cra_collectif_id = cra_collectif.id) +
                     (SELECT COALESCE(SUM(participants_anonymes.total), 1)
                      FROM participants_anonymes_cras_collectifs participants_anonymes
                      WHERE participants_anonymes.id = cra_collectif.participants_anonymes_id)
                     )::integer AS count
             FROM activites_mediateurs activite
                 LEFT JOIN cras_individuels cra_individuel ON activite.cra_individuel_id = cra_individuel.id
                 LEFT JOIN cras_collectifs cra_collectif ON activite.cra_collectif_id = cra_collectif.id
                 LEFT JOIN cras_demarches_administratives cra_demarche_administrative
                    ON activite.cra_demarche_administrative_id = cra_demarche_administrative.id
                 LEFT JOIN structures structure ON structure.id = COALESCE(
                     cra_individuel.lieu_activite_id,
                     cra_collectif.lieu_activite_id,
                     cra_demarche_administrative.lieu_activite_id
                 )
             WHERE (activite.mediateur_id = ${mediateurId}::UUID OR ${mediateurId} = '_any_')
                 AND (
                    (cra_individuel.suppression IS NULL AND cra_individuel.id IS NOT NULL)
                        OR (cra_collectif.suppression IS NULL AND cra_collectif.id IS NOT NULL)
                        OR (cra_demarche_administrative.suppression IS NULL AND cra_demarche_administrative.id IS NOT NULL)
                 )
         )
    SELECT
        TO_CHAR(d.date, 'DD/MM') AS label,
        COALESCE(SUM(ac.count), 0)::integer AS count
    FROM days d
             LEFT JOIN activities_count ac ON d.date = ac.date_truncated
    GROUP BY d.date
    ORDER BY d.date;
`
