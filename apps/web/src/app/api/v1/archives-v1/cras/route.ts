import { NextRequest, NextResponse } from 'next/server'
import { apiRoute } from '@app/web/app/api/v1/apiRoute'
import type {
  JsonApiListResponse,
  JsonApiResource,
} from '@app/web/app/api/v1/JsonApiTypes'
import { prismaClient } from '@app/web/prismaClient'
import { apiV1Url } from '@app/web/app/api/v1/apiV1Url'

/**
 * API response types MUST be manually defined to NOT be infered
 * so API response are stable even if the database schema or transformations changes
 */

type CraV1Attributes = {
  imported_at: string
  conseiller_numerique_id: string
  canal: string
  activite: string
  nb_participants: number
  nb_participants_recurrents: number

  age_moins_12_ans: number
  age_de_12_a_18_ans: number
  age_de_18_a_35_ans: number
  age_de_35_a_60_ans: number
  age_plus_60_ans: number

  statut_etudiant: number
  statut_sans_emploi: number
  statut_en_emploi: number
  statut_retraite: number
  statut_heterogene: number

  themes: string[]

  sous_themes_equipement_informatique: string[]
  sous_themes_sante: string[]
  sous_themes_accompagner: string[]
  sous_themes_traitement_texte: string[]

  duree: string
  duree_minutes: number

  accompagnement_individuel: number
  accompagnement_atelier: number
  accompagnement_redirection: number

  code_postal: string
  nom_commune: string
  date_accompagnement: string
  code_commune: string
  organismes: Record<string, number> | null // e.g. { PAN_ANTS: 1, CAF: 2}
  annotation: string | null

  created_at: string
  updated_at: string | null

  structure_id: string | null
  structure_id_pg: number | null
  structure_type: string | null
  structure_statut: string | null
  structure_nom: string | null
  structure_siret: string | null
  structure_code_postal: string | null
  structure_nom_commune: string | null
  structure_code_commune: string | null
  structure_code_departement: string | null
  structure_code_region: string | null
}

type CraV1Relationships = 'user'

export type CraV1Resource = JsonApiResource<
  'craV1',
  CraV1Attributes,
  CraV1Relationships
>

export type CraV1ListResponse = JsonApiListResponse<CraV1Resource>

/**
 * @openapi
 * /archives-v1/cras:
 *   get:
 *     summary: liste les cras v1 archivés
 *     description: >
 *       retourne la liste des cras importés depuis la version 1 de la coop réalisée par
 *       l'équipe du dispositif conseiller-numérique et importés dans cette version de la coop
 *       pour archivage. pour toute question sur les données, veuillez vous adresser à l'équipe
 *       du dispositif conseiller-numérique. les données suivent la spécification json:api.
 *     tags:
 *       - Cras
 *     parameters:
 *       - in: query
 *         name: page[size]
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: nombre maximum d'éléments à retourner
 *       - in: query
 *         name: page[number]
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: numéro de la page à retourner
 *     responses:
 *       200:
 *         description: liste de cras v1
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [data, links, meta]
 *               properties:
 *                 jsonapi:
 *                   type: object
 *                   required: [version]
 *                   properties:
 *                     version:
 *                       type: string
 *                       example: "1.0"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     required: [type, id, attributes]
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "craV1"
 *                       id:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       attributes:
 *                         type: object
 *                         required:
 *                           - imported_at
 *                           - conseiller_numerique_id
 *                           - canal
 *                           - activite
 *                           - nb_participants
 *                           - nb_participants_recurrents
 *                           - age_moins_12_ans
 *                           - age_de_12_a_18_ans
 *                           - age_de_18_a_35_ans
 *                           - age_de_35_a_60_ans
 *                           - age_plus_60_ans
 *                           - statut_etudiant
 *                           - statut_sans_emploi
 *                           - statut_en_emploi
 *                           - statut_retraite
 *                           - statut_heterogene
 *                           - themes
 *                           - sous_themes_equipement_informatique
 *                           - sous_themes_sante
 *                           - sous_themes_accompagner
 *                           - sous_themes_traitement_texte
 *                           - duree
 *                           - duree_minutes
 *                           - accompagnement_individuel
 *                           - accompagnement_atelier
 *                           - accompagnement_redirection
 *                           - code_postal
 *                           - nom_commune
 *                           - date_accompagnement
 *                           - code_commune
 *                           - created_at
 *                         properties:
 *                           imported_at:
 *                             type: string
 *                             format: date-time
 *                             description: date d'import du cra dans la nouvelle coop
 *                           conseiller_numerique_id:
 *                             type: string
 *                             description: identifiant du conseiller numérique v1
 *                           canal:
 *                             type: string
 *                             description: canal de l'accompagnement
 *                           activite:
 *                             type: string
 *                             description: type d'activité
 *                           nb_participants:
 *                             type: number
 *                             description: nombre total de participants
 *                           nb_participants_recurrents:
 *                             type: number
 *                             description: nombre de participants récurrents
 *                           age_moins_12_ans:
 *                             type: number
 *                             description: nombre de participants de moins de 12 ans
 *                           age_de_12_a_18_ans:
 *                             type: number
 *                             description: nombre de participants entre 12 et 18 ans
 *                           age_de_18_a_35_ans:
 *                             type: number
 *                             description: nombre de participants entre 18 et 35 ans
 *                           age_de_35_a_60_ans:
 *                             type: number
 *                             description: nombre de participants entre 35 et 60 ans
 *                           age_plus_60_ans:
 *                             type: number
 *                             description: nombre de participants de plus de 60 ans
 *                           statut_etudiant:
 *                             type: number
 *                             description: nombre de participants étudiants
 *                           statut_sans_emploi:
 *                             type: number
 *                             description: nombre de participants sans emploi
 *                           statut_en_emploi:
 *                             type: number
 *                             description: nombre de participants en emploi
 *                           statut_retraite:
 *                             type: number
 *                             description: nombre de participants retraités
 *                           statut_heterogene:
 *                             type: number
 *                             description: nombre de participants statut hétérogène
 *                           themes:
 *                             type: array
 *                             items:
 *                               type: string
 *                             description: liste des thèmes abordés
 *                           sous_themes_equipement_informatique:
 *                             type: array
 *                             items:
 *                               type: string
 *                             description: liste des sous-thèmes d'équipement informatique
 *                           sous_themes_sante:
 *                             type: array
 *                             items:
 *                               type: string
 *                             description: liste des sous-thèmes liés à la santé
 *                           sous_themes_accompagner:
 *                             type: array
 *                             items:
 *                               type: string
 *                             description: liste des sous-thèmes liés à l'accompagnement
 *                           sous_themes_traitement_texte:
 *                             type: array
 *                             items:
 *                               type: string
 *                             description: liste des sous-thèmes liés au traitement de texte
 *                           duree:
 *                             type: string
 *                             description: durée au format lisible (e.g. "1h30")
 *                           duree_minutes:
 *                             type: number
 *                             description: durée en minutes
 *                           accompagnement_individuel:
 *                             type: number
 *                             description: nombre d'accompagnements individuels
 *                           accompagnement_atelier:
 *                             type: number
 *                             description: nombre d'ateliers
 *                           accompagnement_redirection:
 *                             type: number
 *                             description: nombre d'accompagnements en redirection
 *                           code_postal:
 *                             type: string
 *                             description: code postal du lieu d'accompagnement
 *                           nom_commune:
 *                             type: string
 *                             description: nom de la commune
 *                           date_accompagnement:
 *                             type: string
 *                             format: date-time
 *                             description: date de l'accompagnement
 *                           code_commune:
 *                             type: string
 *                             description: code commune (INSEE)
 *                           organismes:
 *                             type: object
 *                             additionalProperties:
 *                               type: number
 *                             nullable: true
 *                             description: objet clé-valeur représentant le nombre d'interactions par organisme
 *                           annotation:
 *                             type: string
 *                             nullable: true
 *                             description: commentaire ou annotation complémentaire
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             description: date de création de l'entrée
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                             nullable: true
 *                             description: date de dernière mise à jour de l'entrée
 *                           structure_id:
 *                             type: string
 *                             nullable: true
 *                             description: identifiant de la structure
 *                           structure_id_pg:
 *                             type: number
 *                             nullable: true
 *                             description: identifiant numérique de la structure
 *                           structure_type:
 *                             type: string
 *                             nullable: true
 *                             description: type de la structure
 *                           structure_statut:
 *                             type: string
 *                             nullable: true
 *                             description: statut de la structure
 *                           structure_nom:
 *                             type: string
 *                             nullable: true
 *                             description: nom de la structure
 *                           structure_siret:
 *                             type: string
 *                             nullable: true
 *                             description: siret de la structure
 *                           structure_code_postal:
 *                             type: string
 *                             nullable: true
 *                             description: code postal de la structure
 *                           structure_nom_commune:
 *                             type: string
 *                             nullable: true
 *                             description: nom de commune de la structure
 *                           structure_code_commune:
 *                             type: string
 *                             nullable: true
 *                             description: code commune (INSEE) de la structure
 *                           structure_code_departement:
 *                             type: string
 *                             nullable: true
 *                             description: code du département
 *                           structure_code_region:
 *                             type: string
 *                             nullable: true
 *                             description: code de la région
 *                 links:
 *                   type: object
 *                   properties:
 *                     self:
 *                       type: string
 *                       format: uri
 *                       description: lien vers cette ressource
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       description: nombre total d'éléments renvoyés
 *                     itemCount:
 *                       type: integer
 *                       description: nombre d'éléments dans cette page
 *                     itemsPerPage:
 *                       type: integer
 *                       description: nombre d'éléments par page
 *                     totalPages:
 *                       type: integer
 *                       description: nombre total de pages
 *                     currentPage:
 *                       type: integer
 *                       description: page courante
 *                     hasNextPage:
 *                       type: boolean
 *                       description: indique s'il existe une page suivante
 *                     hasPrevPage:
 *                       type: boolean
 *                       description: indique s'il existe une page précédente
 */
export const GET = apiRoute<CraV1ListResponse>(
  ['Cras'],
  async (_request: NextRequest) => {
    const cras = await prismaClient.craConseillerNumeriqueV1.findMany({
      take: 100,
    })

    const response: CraV1ListResponse = {
      data: cras.map(
        ({
          id,
          importedAt,
          v1ConseillerNumeriqueId,
          canal,
          activite,
          nbParticipants,
          nbParticipantsRecurrents,

          ageMoins12Ans,
          ageDe12a18Ans,
          ageDe18a35Ans,
          ageDe35a60Ans,
          agePlus60Ans,

          statutEtudiant,
          statutSansEmploi,
          statutEnEmploi,
          statutRetraite,
          statutHeterogene,

          themes,

          sousThemesEquipementInformatique,
          sousThemesSante,
          sousThemesAccompagner,
          sousThemesTraitementTexte,

          duree,
          dureeMinutes,

          accompagnementIndividuel,
          accompagnementAtelier,
          accompagnementRedirection,

          codePostal,
          nomCommune,
          dateAccompagnement,
          codeCommune,
          organismes,
          annotation,

          createdAt,
          updatedAt,

          structureId,
          structureIdPg,
          structureType,
          structureStatut,
          structureNom,
          structureSiret,
          structureCodePostal,
          structureNomCommune,
          structureCodeCommune,
          structureCodeDepartement,
          structureCodeRegion,
        }) =>
          ({
            type: 'craV1',
            id,
            attributes: {
              imported_at: importedAt.toISOString(),
              conseiller_numerique_id: v1ConseillerNumeriqueId,
              canal,
              activite,
              nb_participants: nbParticipants,
              nb_participants_recurrents: nbParticipantsRecurrents,

              age_moins_12_ans: ageMoins12Ans,
              age_de_12_a_18_ans: ageDe12a18Ans,
              age_de_18_a_35_ans: ageDe18a35Ans,
              age_de_35_a_60_ans: ageDe35a60Ans,
              age_plus_60_ans: agePlus60Ans,

              statut_etudiant: statutEtudiant,
              statut_sans_emploi: statutSansEmploi,
              statut_en_emploi: statutEnEmploi,
              statut_retraite: statutRetraite,
              statut_heterogene: statutHeterogene,

              themes,

              sous_themes_equipement_informatique:
                sousThemesEquipementInformatique,
              sous_themes_sante: sousThemesSante,
              sous_themes_accompagner: sousThemesAccompagner,
              sous_themes_traitement_texte: sousThemesTraitementTexte,

              duree,
              duree_minutes: dureeMinutes,

              accompagnement_individuel: accompagnementIndividuel,
              accompagnement_atelier: accompagnementAtelier,
              accompagnement_redirection: accompagnementRedirection,

              code_postal: codePostal,
              nom_commune: nomCommune,
              date_accompagnement: dateAccompagnement.toISOString(),
              code_commune: codeCommune,
              organismes: organismes as Record<string, number> | null,
              annotation,

              created_at: createdAt.toISOString(),
              updated_at: updatedAt?.toISOString() ?? null,

              structure_id: structureId,
              structure_id_pg: structureIdPg,
              structure_type: structureType,
              structure_statut: structureStatut,
              structure_nom: structureNom,
              structure_siret: structureSiret,
              structure_code_postal: structureCodePostal,
              structure_nom_commune: structureNomCommune,
              structure_code_commune: structureCodeCommune,
              structure_code_departement: structureCodeDepartement,
              structure_code_region: structureCodeRegion,
            },
          }) satisfies CraV1Resource,
      ),
      links: {
        self: { href: apiV1Url('/archives-v1/cras') },
      },
      meta: {
        total_count: cras.length,
        items_per_page: 100,
        total_pages: 1,
        current_page: 1,
        has_next_page: false,
        has_prev_page: false,
      },
    }

    return NextResponse.json(response)
  },
)
