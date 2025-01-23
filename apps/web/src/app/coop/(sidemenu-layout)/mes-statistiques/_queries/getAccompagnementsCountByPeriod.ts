import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import type { ActivitesFilters } from '@app/web/cra/ActivitesFilters'
import {
  getActiviteFiltersSqlFragment,
  getActivitesFiltersWhereConditions,
} from '@app/web/cra/activitesFiltersSqlWhereConditions'
import {
  MonthShortLabel,
  monthShortLabels,
} from '@app/web/utils/monthShortLabels'
import { LabelAndCount } from '../quantifiedShare'
import { activitesMediateurIdsWhereCondition } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/activitesMediateurIdsWhereCondition'

const EMPTY_ACCOMPAGNEMENTS_COUNT = monthShortLabels.map(
  (label: MonthShortLabel) => ({ label, count: 0 }),
)

export const getAccompagnementsCountByMonth = async ({
  mediateurIds,
  activitesFilters,
  periodEnd,
  intervals = 12,
}: {
  mediateurIds?: string[] // Undefined means no filter, empty array means no mediateur / no data.
  activitesFilters: ActivitesFilters
  periodEnd?: string // Format should be 'YYYY-MM', defaults to CURRENT_DATE if not provided
  intervals?: number // Default to 12 if not provided
}) => {
  if (mediateurIds?.length === 0) return EMPTY_ACCOMPAGNEMENTS_COUNT

  const endDate = periodEnd
    ? `TO_DATE('${periodEnd}', 'YYYY-MM')`
    : `CURRENT_DATE`
  const fromDate = `DATE_TRUNC('month', ${endDate} - INTERVAL '${intervals - 1} months')`

  return prismaClient.$queryRaw<{ month: number; count: number }[]>`
      WITH filtered_accompagnements AS (SELECT activites.date
                                        FROM activites
                                                 INNER JOIN accompagnements ON accompagnements.activite_id = activites.id
                                                 LEFT JOIN structures ON structures.id = activites.structure_id
                                        WHERE ${activitesMediateurIdsWhereCondition(mediateurIds)}
                                          AND activites.suppression IS NULL
                                          AND ${getActiviteFiltersSqlFragment(
                                            getActivitesFiltersWhereConditions(
                                              activitesFilters,
                                            ),
                                          )}
                                          AND activites.date <= ${Prisma.raw(endDate)}
                                          AND activites.date >= ${Prisma.raw(fromDate)}),
           months AS (SELECT generate_series(
                                     ${Prisma.raw(fromDate)},
                                     ${Prisma.raw(endDate)},
                                     '1 month'::interval
                             ) AS month)
      SELECT EXTRACT(MONTH FROM months.month)::int     AS month,
             COUNT(filtered_accompagnements.date)::int AS count
      FROM months
               LEFT JOIN filtered_accompagnements
                         ON DATE_TRUNC('month', filtered_accompagnements.date) = months.month
      GROUP BY months.month
      ORDER BY months.month
  `.then((result) =>
    result.map(({ count, month }) => ({
      count,
      label: monthShortLabels[month - 1],
    })),
  )
}

export const getAccompagnementsCountByDay = async ({
  mediateurIds,
  activitesFilters,
  periodEnd,
  intervals = 30,
}: {
  mediateurIds?: string[] // Undefined means no filter, empty array means no mediateur / no data.
  activitesFilters: ActivitesFilters
  periodEnd?: string // Format should be 'YYYY-MM-DD', defaults to CURRENT_DATE if not provided
  intervals?: number // Default to 30 if not provided
}) => {
  if (mediateurIds?.length === 0) return EMPTY_ACCOMPAGNEMENTS_COUNT

  const endDate = periodEnd
    ? `TO_DATE('${periodEnd}', 'YYYY-MM-DD')`
    : `CURRENT_DATE`
  const fromDate = `DATE_TRUNC('day', ${endDate} - INTERVAL '${intervals - 1} days')`

  return prismaClient.$queryRaw<LabelAndCount[]>`
      WITH filtered_accompagnements AS (SELECT DATE_TRUNC('day', activites.date) AS date
                                        FROM activites
                                                 INNER JOIN accompagnements ON accompagnements.activite_id = activites.id
                                                 LEFT JOIN structures ON structures.id = activites.structure_id
                                        WHERE ${activitesMediateurIdsWhereCondition(mediateurIds)}
                                          AND activites.suppression IS NULL
                                          AND ${getActiviteFiltersSqlFragment(
                                            getActivitesFiltersWhereConditions(
                                              activitesFilters,
                                            ),
                                          )}
                                          AND activites.date <= ${Prisma.raw(endDate)}
                                          AND activites.date >= ${Prisma.raw(fromDate)}),
           days AS (SELECT generate_series(
                                   ${Prisma.raw(fromDate)},
                                   ${Prisma.raw(endDate)},
                                   '1 day'::interval
                           ) AS date)


      SELECT TO_CHAR(days.date, 'DD/MM')               AS label,
             COUNT(filtered_accompagnements.date)::int AS count
      FROM days
               LEFT JOIN filtered_accompagnements
                         ON filtered_accompagnements.date = days.date
      GROUP BY days.date
      ORDER BY days.date
  `
}
