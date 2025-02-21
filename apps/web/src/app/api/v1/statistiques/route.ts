import type {
  JsonApiItemResponse,
  JsonApiResource,
} from '@app/web/app/api/v1/JsonApiTypes'
import { apiV1Url } from '@app/web/app/api/v1/apiV1Url'
import { createApiV1Route } from '@app/web/app/api/v1/createApiV1Route'
import { serializeApiRequestParams } from '@app/web/app/api/v1/serializeApiRequestParams'
import { ApiV1StatistiquesQueryParamsValidation } from '@app/web/app/api/v1/statistiques/ApiV1StatistiquesQueryParams'
import {
  getAccompagnementsCountByDay,
  getAccompagnementsCountByMonth,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getAccompagnementsCountByPeriod'
import {
  ActivitesStats,
  getActivitesStats,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getActivitesStats'
import {
  BeneficiaireStats,
  getBeneficiaireStats,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getBeneficiaireStats'
import {
  TotalCountsStats,
  getTotalCountsStats,
} from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/_queries/getTotalCountsStats'
import type { LabelAndCount } from '@app/web/app/coop/(sidemenu-layout)/mes-statistiques/quantifiedShare'
import {
  ChangeObjectKeysCaseRecursive,
  changeObjectKeysCaseRecursive,
} from '@app/web/utils/changeObjectKeysCaseRecursive'
import { NextResponse } from 'next/server'

/**
 * @openapi
 * components:
 *   schemas:
 *     LabelCount:
 *       type: object
 *       properties:
 *         label:
 *           type: string
 *           example: "31/12"
 *         count:
 *           type: integer
 *           example: 497
 *
 *     ValueLabelCountProportion:
 *       type: object
 *       properties:
 *         value:
 *           type: string
 *           example: "Masculin"
 *         label:
 *           type: string
 *           example: "Masculin"
 *         count:
 *           type: integer
 *           example: 76493
 *         proportion:
 *           type: number
 *           format: float
 *           example: 26.576
 *
 *     Beneficiaires:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 287830
 *         genres:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ValueLabelCountProportion'
 *         tranche_ages:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ValueLabelCountProportion'
 *         statuts_social:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ValueLabelCountProportion'
 *
 *     Activites:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 174140
 *         type_activites:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ValueLabelCountProportion'
 *         durees:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ValueLabelCountProportion'
 *         type_lieu:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ValueLabelCountProportion'
 *         thematiques:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ValueLabelCountProportion'
 *         thematiques_demarches:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ValueLabelCountProportion'
 *         materiels:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ValueLabelCountProportion'
 *
 *     TotauxActivites:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 174140
 *         individuels:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 95189
 *             proportion:
 *               type: number
 *               format: float
 *               example: 54.662
 *         collectifs:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 27404
 *             proportion:
 *               type: number
 *               format: float
 *               example: 15.737
 *             participants:
 *               type: integer
 *               example: 178210
 *         demarches:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 51547
 *             proportion:
 *               type: number
 *               format: float
 *               example: 29.601
 *
 *     TotauxAccompagnements:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 324949
 *         individuels:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 95189
 *             proportion:
 *               type: number
 *               format: float
 *               example: 29.294
 *         collectifs:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 178210
 *             proportion:
 *               type: number
 *               format: float
 *               example: 54.843
 *         demarches:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *               example: 51547
 *             proportion:
 *               type: number
 *               format: float
 *               example: 15.863
 *
 *     TotauxBeneficiaires:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           example: 287830
 *         nouveaux:
 *           type: integer
 *           example: 0
 *         suivis:
 *           type: integer
 *           example: 23405
 *         anonymes:
 *           type: integer
 *           example: 264425
 *
 *     Totaux:
 *       type: object
 *       properties:
 *         activites:
 *           $ref: '#/components/schemas/TotauxActivites'
 *         accompagnements:
 *           $ref: '#/components/schemas/TotauxAccompagnements'
 *         beneficiaires:
 *           $ref: '#/components/schemas/TotauxBeneficiaires'
 *
 *     StatistiquesAttributes:
 *       type: object
 *       properties:
 *         accompagnements_par_jour:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/LabelCount'
 *         accompagnements_par_mois:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/LabelCount'
 *         beneficiaires:
 *           $ref: '#/components/schemas/Beneficiaires'
 *         activites:
 *           $ref: '#/components/schemas/Activites'
 *         totaux:
 *           $ref: '#/components/schemas/Totaux'
 *
 *     Statistiques:
 *       type: object
 *       required: [type, id, attributes]
 *       properties:
 *         type:
 *           type: string
 *           example: "statistiques"
 *           enum: [statistiques]
 *         id:
 *           type: string
 *           example: "statistiques"
 *         attributes:
 *           $ref: '#/components/schemas/StatistiquesAttributes'
 *
 * /statistiques:
 *   get:
 *     summary: obtenir des statistiques globales
 *     description: >
 *       retourne les données agrégées (accompagnements par jour, par mois, répartition des bénéficiaires, etc.)
 *     tags:
 *       - Statistiques
 *     parameters:
 *       - in: query
 *         name: filter[du]
 *         required: false
 *         description: Date de l’activité minimum, au format ISO (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
 *           example: '2022-01-01'
 *
 *       - in: query
 *         name: filter[au]
 *         required: false
 *         description: Date de l’activité maximum, au format ISO (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
 *           example: '2022-01-31'
 *
 *       - in: query
 *         name: filter[type]
 *         required: false
 *         description: Type d’activité (individuel, démarche ou collectif)
 *         schema:
 *           type: string
 *           enum: [Individuel, Demarche, Collectif]
 *           example: 'Individuel'
 *
 *       - in: query
 *         name: filter[mediateur]
 *         required: false
 *         description: UUID du médiateur ayant réalisé l’activité
 *         schema:
 *           type: string
 *           format: uuid
 *           example: '123e4567-e89b-12d3-a456-426614174000'
 *
 *       - in: query
 *         name: filter[beneficiaire]
 *         required: false
 *         description: UUID du bénéficiaire de l’activité
 *         schema:
 *           type: string
 *           format: uuid
 *           example: '123e4567-e89b-12d3-a456-426614174000'
 *
 *       - in: query
 *         name: filter[commune]
 *         required: false
 *         description: Code INSEE de la commune où l’activité a été réalisée (5 caractères)
 *         schema:
 *           type: string
 *           minLength: 5
 *           maxLength: 5
 *           example: '69385'
 *
 *       - in: query
 *         name: filter[departement]
 *         required: false
 *         description: Code du département où l’activité a été réalisée (1 à 3 caractères)
 *         schema:
 *           type: string
 *           maxLength: 3
 *           example: '69'
 *
 *       - in: query
 *         name: filter[lieu]
 *         required: false
 *         description: UUID du lieu où l’activité a été réalisée
 *         schema:
 *           type: string
 *           format: uuid
 *           example: '123e4567-e89b-12d3-a456-426614174000'
 *
 *       - in: query
 *         name: filter[conseiller_numerique]
 *         schema:
 *           type: string
 *           enum: ['0', '1']
 *         required: false
 *         description: Indique si l’activité a été effectuée par un médiateur dans le cadre du dispositif "conseiller numérique". '0' signifie hors dispositif, '1' signifie dans le dispositif.
 *
 *     responses:
 *       200:
 *         description: données statistiques
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [data, links, meta]
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Statistiques'
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: object
 *                       properties:
 *                         href:
 *                           type: string
 *                           format: uri
 *                           example: "http://localhost:3000/api/v1/statistiques"
 *                 meta:
 *                   type: object
 *                   example: {}
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
    const activitesFilters = params.filter

    const [
      accompagnementsParJour,
      accompagnementsParMois,
      beneficiaires,
      activites,
      totalCounts,
    ] = await Promise.all([
      getAccompagnementsCountByDay({ activitesFilters }),
      getAccompagnementsCountByMonth({ activitesFilters }),
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

    const currentUrlSearchParams = serializeApiRequestParams(params)

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
