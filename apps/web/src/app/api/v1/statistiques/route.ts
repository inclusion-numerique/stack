import { NextResponse } from 'next/server'
import {
  JsonApiItemResponse,
  JsonApiResource,
} from '@app/web/app/api/v1/JsonApiTypes'
import { apiV1Url } from '@app/web/app/api/v1/apiV1Url'
import { createApiV1Route } from '@app/web/app/api/v1/createApiV1Route'
import { ApiV1StatistiquesQueryParamsValidation } from '@app/web/app/api/v1/statistiques/ApiV1StatistiquesQueryParams'
import {
  getAccompagnementsCountByDay,
  getAccompagnementsCountByMonth,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getAccompagnementsCountByPeriod'
import { getBeneficiaireStats } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getBeneficiaireStats'
import {
  getActivitesStats,
  getActivitesStructuresStats,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getActivitesStats'
import { getTotalCountsStats } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getTotalCountsStats'

type StatistiquesAttributes = {}

type StructureRelationships = never

export type StatistiqueResource = JsonApiResource<
  'statistique',
  StatistiquesAttributes,
  StructureRelationships
>

export type StatistiquesResponse = JsonApiItemResponse<StatistiqueResource>

export const GET = createApiV1Route
  .configure<StatistiquesResponse>({
    scopes: ['Statistiques'],
  })
  .queryParams(ApiV1StatistiquesQueryParamsValidation)
  .handle(async ({ params }) => {
    const activitesFilters = params

    const [
      accompagnementsParJour,
      accompagnementsParMois,
      beneficiaires,
      activites,
      structures,
      totalCounts,
    ] = await Promise.all([
      getAccompagnementsCountByDay({
        activitesFilters,
      }),
      getAccompagnementsCountByMonth({
        activitesFilters,
      }),
      getBeneficiaireStats({ activitesFilters }),
      getActivitesStats({ activitesFilters }),
      getActivitesStructuresStats({ activitesFilters }),
      getTotalCountsStats({ activitesFilters }),
    ])

    const data = {
      accompagnements_par_jour: accompagnementsParJour,
      accompagnements_par_mois: accompagnementsParMois,
      beneficiaires,
      activites,
      structures,
      totaux: totalCounts,
    } satisfies StatistiquesAttributes

    const response: StatistiquesResponse = {
      data,
      links: {
        self: {
          href: apiV1Url(
            `/statistiques?${new URLSearchParams(params).toString()}`,
          ),
        },
      },
      meta: {},
    }

    return NextResponse.json(response)
  })
