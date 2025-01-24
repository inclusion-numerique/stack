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
import {
  BeneficiaireStats,
  getBeneficiaireStats,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getBeneficiaireStats'
import {
  ActivitesStats,
  getActivitesStats,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getActivitesStats'
import {
  getTotalCountsStats,
  TotalCountsStats,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getTotalCountsStats'
import {
  ChangeObjectKeysCaseRecursive,
  changeObjectKeysCaseRecursive,
} from '@app/web/utils/changeObjectKeysCaseRecursive'
import type { LabelAndCount } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/quantifiedShare'

/**
 * @openapi
 * /statistiques:
 *   get:
 *     summary: Statistiques
 *     description: Retourne les statistiques des accompagnements de la coop, filtrés par les paramètres de la requête.
 *     tags:
 *       - Statistiques
 *     responses:
 *       200:
 *         description: Les statistiques
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */

type StatistiquesAttributes = {
  accompagnements_par_jour: LabelAndCount[]
  accompagnements_par_mois: LabelAndCount[]
  beneficiaires: ChangeObjectKeysCaseRecursive<BeneficiaireStats, 'snake'>
  activites: ChangeObjectKeysCaseRecursive<ActivitesStats, 'snake'>
  totaux: ChangeObjectKeysCaseRecursive<TotalCountsStats, 'snake'>
}

type StructureRelationships = never

export type StatistiqueResource = JsonApiResource<
  'statistiques',
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
      getTotalCountsStats({ activitesFilters }),
    ])

    const attributes = changeObjectKeysCaseRecursive(
      {
        accompagnementsParJour,
        accompagnementsParMois,
        beneficiaires,
        activites,
        totaux: totalCounts,
      },
      'snake',
    ) satisfies StatistiquesAttributes

    const currentUrlSearchParams = new URLSearchParams(params).toString()

    const response: StatistiquesResponse = {
      data: {
        type: 'statistiques',
        id: 'statistiques',
        attributes,
      },
      links: {
        self: {
          href: apiV1Url(
            currentUrlSearchParams.length > 0
              ? `/statistiques?${currentUrlSearchParams}`
              : '/statistiques',
          ),
        },
      },
      meta: {},
    }

    return NextResponse.json(response)
  })
