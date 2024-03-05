import { prismaClient } from '@app/web/prismaClient'
import {
  computeCreationProportions,
  CreationStatisticsResult,
} from './creationStatistics'
import {
  targetAudiencesUsages,
  themesUsages,
  UsageStatisticsResult,
} from './usageStatistics'

export type StatisticsTimeframe = 'semaine' | 'mois' | 'total'

export type StatisticsParams = {
  recherche?: StatisticsTimeframe
  fonctionnalites?: StatisticsTimeframe
}

type KpiStatisticsResult = [
  { category: 'public_resource'; count: number },
  { category: 'private_resource'; count: number },
  { category: 'resource_views'; count: number },
  { category: 'resource_views_last_month'; count: number },
  { category: 'resource_views_two_months_ago'; count: number },
  { category: 'feedback'; count: number },
  { category: 'feedback_average'; count: number },
]

type SearchStatisticsResult = {
  period: string
  collection_resources: number
  search_executions: number
  resource_views: number
}[]

export const statisticsTimeframeLabels: {
  [key in StatisticsTimeframe]: string
} = {
  semaine: 'Par semaine',
  mois: 'Par mois',
  total: 'Cumulé',
}

export const getStatistics = async (_params: StatisticsParams) => {
  const [
    feedback,
    feedbackAverage,
    privateResource,
    publicResource,
    ressourceViews,
    ressourceViewsLastMonth,
  ] = await prismaClient.$queryRaw<KpiStatisticsResult>`
      SELECT 'public_ressource' AS category, COUNT(*)::integer AS count
      FROM resources WHERE is_public = true AND deleted IS NULL AND published IS NOT NULL
      UNION
      SELECT 'private_ressource' AS category, COUNT(*)::integer AS count
      FROM resources WHERE is_public = false AND deleted IS NULL AND published IS NOT NULL
      UNION
      SELECT 'ressource_views' AS category, COUNT(*)::integer
      FROM resource_views AS count
      UNION
      SELECT 'ressource_views_last_month' AS category,  COUNT(*)::integer
      FROM (
               SELECT * FROM resource_views
               WHERE timestamp >= CURRENT_DATE - INTERVAL '30 days'
           ) AS count
      UNION
      SELECT 'feedback' AS category, COUNT(*)::integer AS count
      FROM feedback
      UNION
      SELECT 'feedback_average' AS category, AVG(rating)::numeric(10,2)::float AS count
      FROM feedback
      ORDER BY category
  `

  const kpi = {
    publications: {
      count: publicResource.count + privateResource.count,
      public: publicResource.count,
      private: privateResource.count,
    },
    views: {
      count: ressourceViews.count,
      lastMonth: ressourceViewsLastMonth.count,
    },
    rates: {
      count: feedback.count,
      average: feedbackAverage.count,
    },
  }

  const searchStatisticsDaysInterval = 7

  const searchStatisticsResult =
    await prismaClient.$queryRawUnsafe<SearchStatisticsResult>(`
        WITH series AS (
            SELECT generate_series(CURRENT_DATE - INTERVAL '${searchStatisticsDaysInterval * 4} days', CURRENT_DATE - INTERVAL '${searchStatisticsDaysInterval} days', '${searchStatisticsDaysInterval} days'::interval) AS start_date
        ), range AS (
            SELECT start_date, (start_date + INTERVAL '${searchStatisticsDaysInterval} days') AS end_date FROM series
        )
      SELECT
          (SELECT COUNT(*)::integer FROM collection_resources WHERE added BETWEEN start_date AND end_date) AS collection_resources,
          (SELECT COUNT(*)::integer FROM search_executions WHERE timestamp BETWEEN start_date AND end_date) AS search_executions,
          (SELECT COUNT(*)::integer FROM resource_views WHERE timestamp BETWEEN start_date AND end_date) AS resource_views,
          TO_CHAR(start_date, 'DD/MM') || ' ' || TO_CHAR(end_date, 'DD/MM')  AS period
      FROM range`)

  const creationStatisticsDaysInterval = 7

  const creationStatisticsResult =
    await prismaClient.$queryRawUnsafe<CreationStatisticsResult>(`
      WITH series AS (
          SELECT generate_series(CURRENT_DATE - INTERVAL '${creationStatisticsDaysInterval * 4} days', CURRENT_DATE - INTERVAL '${creationStatisticsDaysInterval} days', '${creationStatisticsDaysInterval} days'::interval) AS start_date
      ), range AS (
          SELECT start_date, (start_date + INTERVAL '${creationStatisticsDaysInterval} days') AS end_date FROM series
      )
      SELECT
          (SELECT COUNT(*)::integer FROM resources pu_r WHERE pu_r.created BETWEEN start_date AND end_date AND pu_r.is_public IS true AND pu_r.published IS NOT NULL AND pu_r.deleted IS NULL) AS public_resources,
          (SELECT COUNT(*)::integer FROM resources pr_r WHERE pr_r.created BETWEEN start_date AND end_date AND pr_r.is_public IS false AND pr_r.published IS NOT NULL AND pr_r.deleted IS NULL) AS private_resources,
          (SELECT COUNT(*)::integer FROM resources d_r WHERE d_r.created BETWEEN start_date AND end_date AND d_r.published IS NULL AND d_r.deleted IS NULL) AS draft_resources,
          (SELECT COUNT(*)::integer FROM users pu_u WHERE pu_u.created BETWEEN start_date AND end_date AND pu_u.is_public IS true AND pu_u.deleted IS NULL) AS public_users,
          (SELECT COUNT(*)::integer FROM users pr_u WHERE pr_u.created BETWEEN start_date AND end_date AND pr_u.is_public IS false AND pr_u.deleted IS NULL) AS private_users,
          (SELECT COUNT(*)::integer FROM bases pu_b WHERE pu_b.created BETWEEN start_date AND end_date AND pu_b.is_public IS true AND pu_b.deleted IS NULL) AS public_bases,
          (SELECT COUNT(*)::integer FROM bases pr_b WHERE pr_b.created BETWEEN start_date AND end_date AND pr_b.is_public IS false AND pr_b.deleted IS NULL) AS private_bases,
          TO_CHAR(start_date, 'DD/MM') || ' ' || TO_CHAR(end_date, 'DD/MM')  AS period
      FROM range`)

  const usageStatisticsResult =
    await prismaClient.$queryRaw<UsageStatisticsResult>`
      SELECT
          type, key,
          COUNT(*)::integer AS value
      FROM (
               SELECT
                   'target_audiences' AS type,
                   unnest(target_audiences)::text AS key
               FROM
                   resources WHERE published IS NOT NULL AND deleted IS NULL AND is_public IS true
               UNION ALL
               SELECT
                   'themes' AS column_name,
                   unnest(themes)::text AS key
               FROM
                   resources WHERE published IS NOT NULL AND deleted IS NULL AND is_public IS true
           ) AS combined_data
      GROUP BY
          type, key
      ORDER BY
          value DESC`

  return {
    kpi,
    search: searchStatisticsResult,
    creation: {
      data: creationStatisticsResult,
      proportions: computeCreationProportions(creationStatisticsResult),
    },
    usage: {
      thematiques: themesUsages(usageStatisticsResult),
      publics: targetAudiencesUsages(usageStatisticsResult),
    },
  }
}

export type Statistics = Awaited<ReturnType<typeof getStatistics>>
