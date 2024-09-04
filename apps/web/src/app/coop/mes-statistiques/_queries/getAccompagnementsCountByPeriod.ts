import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import {
  crasNotDeletedCondition,
  getActiviteFiltersSqlFragment,
  getCrasFiltersWhereConditions,
} from '@app/web/cra/activitesFiltersSqlWhereConditions'
import { LabelAndCount, QuantifiedShare } from '../quantifiedShare'

export const getAccompagnementsCountByMonth = async ({
  mediateurId,
  activitesFilters,
  periodEnd,
  intervals = 12,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
  periodEnd?: string // Format should be 'YYYY-MM', defaults to CURRENT_DATE if not provided
  intervals?: number // Default to 12 if not provided
}) => {
  const endDate = periodEnd
    ? `TO_DATE('${periodEnd}', 'YYYY-MM')`
    : `CURRENT_DATE`
  const fromDate = `DATE_TRUNC('month', ${endDate} - INTERVAL '${intervals - 1} months')`

  return prismaClient.$queryRaw<(QuantifiedShare & { month_name: string })[]>`
      WITH months AS (SELECT generate_series(
                                     ${Prisma.raw(fromDate)},
                                     ${Prisma.raw(endDate)},
                                     '1 month'::interval
                             ) AS month),
           activities_count AS (SELECT DATE_TRUNC('month', COALESCE(cra_individuel.date, cra_collectif.date,
                                                                    cra_demarche_administrative.date)) AS month_truncated,
                                       (
                                           (SELECT COUNT(*)
                                            FROM participants_ateliers_collectifs participants
                                            WHERE participants.cra_collectif_id = cra_collectif.id) +
                                           (SELECT COALESCE(SUM(participants_anonymes.total), 1)
                                            FROM participants_anonymes_cras_collectifs participants_anonymes
                                            WHERE participants_anonymes.id = cra_collectif.participants_anonymes_id)
                                           )::integer                                                  AS count
                                FROM activites_mediateurs activite
                                         LEFT JOIN cras_individuels cra_individuel
                                                   ON activite.cra_individuel_id = cra_individuel.id
                                         LEFT JOIN cras_collectifs cra_collectif
                                                   ON activite.cra_collectif_id = cra_collectif.id
                                         LEFT JOIN cras_demarches_administratives cra_demarche_administrative
                                                   ON activite.cra_demarche_administrative_id =
                                                      cra_demarche_administrative.id
                                         LEFT JOIN structures ON structures.id = COALESCE(
                                        cra_individuel.lieu_activite_id,
                                        cra_collectif.lieu_activite_id,
                                        cra_demarche_administrative.lieu_activite_id
                                                                                 )
                                WHERE (activite.mediateur_id = ${mediateurId}::UUID OR ${mediateurId} = '_any_')
                                  AND ${crasNotDeletedCondition}
                                  AND ${getActiviteFiltersSqlFragment(
                                    getCrasFiltersWhereConditions(
                                      activitesFilters,
                                    ),
                                  )})
      SELECT TO_CHAR(m.month, 'TMMonth')         AS month_name,
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
                 END                             AS label,
             COALESCE(SUM(ac.count), 0)::integer AS count, -- Somme des comptes pour chaque mois, 0 si aucune activité
             0::integer                          AS proportion
      FROM months m
               LEFT JOIN activities_count ac ON m.month = ac.month_truncated
      GROUP BY m.month
      ORDER BY m.month;
  `
}

export const getAccompagnementsCountByDay = async ({
  mediateurId,
  activitesFilters,
  periodEnd,
  intervals = 30,
}: {
  mediateurId: string
  activitesFilters: ActivitesFilters
  periodEnd?: string // Format should be 'YYYY-MM-DD', defaults to CURRENT_DATE if not provided
  intervals?: number // Default to 30 if not provided
}) => {
  const endDate = periodEnd
    ? `TO_DATE('${periodEnd}', 'YYYY-MM-DD')`
    : `CURRENT_DATE`
  const fromDate = `DATE_TRUNC('day', ${endDate} - INTERVAL '${intervals - 1} days')`

  return prismaClient.$queryRaw<LabelAndCount[]>`
      WITH days AS (SELECT generate_series(
                                   ${Prisma.raw(fromDate)},
                                   ${Prisma.raw(endDate)},
                                   '1 day'::interval
                           ) AS date),
           activities_count AS (SELECT DATE_TRUNC('day', COALESCE(cra_individuel.date, cra_collectif.date,
                                                                  cra_demarche_administrative.date)) AS date_truncated,
                                       (
                                           (SELECT COUNT(*)
                                            FROM participants_ateliers_collectifs participants
                                            WHERE participants.cra_collectif_id = cra_collectif.id) +
                                           (SELECT COALESCE(SUM(participants_anonymes.total), 1)
                                            FROM participants_anonymes_cras_collectifs participants_anonymes
                                            WHERE participants_anonymes.id = cra_collectif.participants_anonymes_id)
                                           )::integer                                                AS count
                                FROM activites_mediateurs activite
                                         LEFT JOIN cras_individuels cra_individuel
                                                   ON activite.cra_individuel_id = cra_individuel.id
                                         LEFT JOIN cras_collectifs cra_collectif
                                                   ON activite.cra_collectif_id = cra_collectif.id
                                         LEFT JOIN cras_demarches_administratives cra_demarche_administrative
                                                   ON activite.cra_demarche_administrative_id =
                                                      cra_demarche_administrative.id
                                         LEFT JOIN structures ON structures.id = COALESCE(
                                        cra_individuel.lieu_activite_id,
                                        cra_collectif.lieu_activite_id,
                                        cra_demarche_administrative.lieu_activite_id
                                                                                 )
                                WHERE (activite.mediateur_id = ${mediateurId}::UUID OR ${mediateurId} = '_any_')
                                  AND ${crasNotDeletedCondition}
                                  AND ${getActiviteFiltersSqlFragment(
                                    getCrasFiltersWhereConditions(
                                      activitesFilters,
                                    ),
                                  )})
      SELECT TO_CHAR(d.date, 'DD/MM')            AS label,
             COALESCE(SUM(ac.count), 0)::integer AS count
      FROM days d
               LEFT JOIN activities_count ac ON d.date = ac.date_truncated
      GROUP BY d.date
      ORDER BY d.date;
  `
}
