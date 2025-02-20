import { NextResponse } from 'next/server'
import { z, type ZodError } from 'zod'
import type {
  JsonApiListResponse,
  JsonApiResource,
} from '@app/web/app/api/v1/JsonApiTypes'
import { prismaClient } from '@app/web/prismaClient'
import { apiV1Url } from '@app/web/app/api/v1/apiV1Url'
import {
  createCompositeCursor,
  JsonApiCursorPaginationQueryParamsValidation,
  parseCompositeCursor,
  prismaCursorPagination,
} from '@app/web/app/api/v1/CursorPagination'
import { createApiV1Route } from '@app/web/app/api/v1/createApiV1Route'
import { encodeSerializableState } from '@app/web/utils/encodeSerializableState'

/**
 * @openapi
 * components:
 *   schemas:
 *     Utilisateur:
 *       type: object
 *       required: [type, id, attributes]
 *       properties:
 *         type:
 *           type: string
 *           example: "utilisateur"
 *           enum: [utilisateur]
 *         id:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         attributes:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: "john.doe@example.org"
 *             prenom:
 *               type: string
 *               nullable: true
 *               example: "john"
 *             nom:
 *               type: string
 *               nullable: true
 *               example: "doe"
 *             inscription_validee:
 *               type: string
 *               format: date-time
 *               nullable: true
 *               example: "2024-01-05T10:00:00Z"
 *             telephone:
 *               type: string
 *               nullable: true
 *               example: "+33123456789"
 *             creation:
 *               type: string
 *               format: date-time
 *               example: "2024-01-01T12:00:00Z"
 *             modification:
 *               type: string
 *               format: date-time
 *               example: "2024-01-02T12:00:00Z"
 *             suppression:
 *               type: string
 *               format: date-time
 *               nullable: true
 *               example: "2024-01-03T12:00:00Z"
 *             emplois:
 *               type: array
 *               description: liste des emplois (relation "EmployeStructure") avec uniquement l'id et l'id de la structure
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   structure_id:
 *                     type: string
 *                     format: uuid
 *                   creation:
 *                     type: string
 *                     format: date-time
 *                   modification:
 *                     type: string
 *                     format: date-time
 *                   suppression:
 *                     type: string
 *                     format: date-time
 *                     nullable: true
 *             mediateur:
 *               type: object
 *               nullable: true
 *               description: données du médiateur
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 creation:
 *                   type: string
 *                   format: date-time
 *                 modification:
 *                   type: string
 *                   format: date-time
 *                 en_activite:
 *                   type: array
 *                   description: liste des liens mediateur-structure (uniquement l'id, structure_id...)
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       structure_id:
 *                         type: string
 *                         format: uuid
 *                       creation:
 *                         type: string
 *                         format: date-time
 *                       modification:
 *                         type: string
 *                         format: date-time
 *                       suppression:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                 coordinations:
 *                   type: array
 *                   description: liste des mediateurs_coordonnes
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       creation:
 *                         type: string
 *                         format: date-time
 *                       modification:
 *                         type: string
 *                         format: date-time
 *                       suppression:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                       coordinateur_id:
 *                         type: string
 *                         format: uuid
 *             coordinateur:
 *               type: object
 *               nullable: true
 *               description: données du coordinateur
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 creation:
 *                   type: string
 *                   format: date-time
 *                 modification:
 *                   type: string
 *                   format: date-time
 *                 mediateurs_coordonnes:
 *                   type: array
 *                   description: liste des mediateurs_coordonnes
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       creation:
 *                         type: string
 *                         format: date-time
 *                       modification:
 *                         type: string
 *                         format: date-time
 *                       suppression:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                       mediateur_id:
 *                         type: string
 *                         format: uuid
 *             conseiller_numerique:
 *               type: object
 *               nullable: true
 *               description: si l’utilisateur est detecté dans le dispositif "conseiller numérique", ses identifiants externes sont stockés dans cet objet
 *               properties:
 *                 id:
 *                   type: string
 *                   description: identifiant de l’utilisateur dans le dispositif "conseiller numérique"
 *                 id_pg:
 *                   type: number
 *                   nullable: true
 *                   description: identifiant alternatif de l’utilisateur dans le dispositif "conseiller numérique"
 * /utilisateurs:
 *   get:
 *     summary: liste des utilisateurs
 *     description: >
 *       Retourne la liste des utilisateurs dont l'inscription est terminée.
 *       Les utilisateurs sont triés par date de création décroissante.
 *     tags:
 *       - Utilisateurs
 *     parameters:
 *       - in: query
 *         name: page[size]
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 500
 *           default: 500
 *         required: false
 *         description: nombre maximum d'éléments à retourner
 *       - in: query
 *         name: page[after]
 *         schema:
 *           type: string
 *         required: false
 *         description: curseur de pagination pour obtenir les éléments suivants
 *       - in: query
 *         name: page[before]
 *         schema:
 *           type: string
 *         required: false
 *         description: curseur de pagination pour obtenir les éléments précédents
 *       - in: query
 *         name: filter[soft_deleted]
 *         schema:
 *           type: string
 *           enum: ['0', '1']
 *         required: false
 *         description: exclure les elements soft-deleted, ce qui permet de ne pas inclure les utilisateurs et leur données rattachées qui ne sont plus d’actualité. '0' pour exclure les utilisateurs supprimés, '1' pour inclure les utilisateurs supprimés uniquement
 *       - in: query
 *         name: filter[conseiller_numerique_id]
 *         schema:
 *            type: string
 *         required: false
 *         description: filtre sur l'identifiant du conseiller numérique, plusieurs valeurs sont possibles séparées par des virgules
 *         examples:
 *           single:
 *             summary: une seule valeur
 *             value: "abcd"
 *           multiple:
 *             summary: plusieurs valeurs
 *             value: "abcd,efgh,ijkl"
 *       - in: query
 *         name: filter[conseiller_numerique_id_pg]
 *         schema:
 *            type: string
 *         required: false
 *         description: filtre sur l'identifiant pg du conseiller numérique, plusieurs valeurs sont possibles séparées par des virgules
 *         examples:
 *           single:
 *             summary: une seule valeur
 *             value: "123"
 *           multiple:
 *             summary: plusieurs valeurs
 *             value: "123,456,789"
 *     responses:
 *       200:
 *         description: liste des utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [data, links, meta]
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Utilisateur'
 *                 links:
 *                   $ref: '#/components/schemas/PaginationLinks'
 *                 meta:
 *                   $ref: '#/components/schemas/ListMetadata'
 */

export type UtilisateurAttributes = {
  email: string
  prenom: string | null
  nom: string | null
  inscription_validee: string | null
  telephone: string | null
  creation: string
  modification: string
  suppression: string | null
  emplois: Array<{
    id: string
    structure_id: string
    creation: string
    modification: string
    suppression: string | null
  }>
  mediateur: {
    id: string
    creation: string
    modification: string
    en_activite: Array<{
      id: string
      structure_id: string
      creation: string
      modification: string
      suppression: string | null
    }>
    coordinations: Array<{
      id: string
      creation: string
      modification: string
      suppression: string | null
      coordinateur_id: string
    }>
  } | null
  coordinateur: {
    id: string
    creation: string
    modification: string
    mediateurs_coordonnes: Array<{
      id: string
      creation: string
      modification: string
      suppression: string | null
      mediateur_id: string
    }>
  } | null
  conseiller_numerique: {
    id: string
    id_pg: number | null
  } | null
}

type UtilisateurRelationships = never

export type UtilisateurResource = JsonApiResource<
  'utilisateur',
  UtilisateurAttributes,
  UtilisateurRelationships
>

export type UtilisateurListResponse = JsonApiListResponse<UtilisateurResource>

/**
 * for consistent cursor-based pagination, we reuse the approach from structures:
 * we'll combine the "created" + "id" fields into a single base64-coded composite cursor
 * ensure you have a unique composite index on (created, id) in your prisma model
 */
const UserCursorValidation = z.object({
  creation_id: z.object({
    // 'created' is a DateTime in 'User' model
    created: z.coerce.string().datetime(),
    id: z.string().uuid(),
  }),
})

export const GET = createApiV1Route
  .configure<UtilisateurListResponse>({
    scopes: ['Utilisateurs'],
  })
  .queryParams(
    JsonApiCursorPaginationQueryParamsValidation.extend({
      filter: z
        .object({
          conseiller_numerique_id: z
            .union([z.string(), z.array(z.string())])
            .optional()
            .transform((value) => {
              if (typeof value === 'string') {
                return [value]
              }
              return value
            }),
          conseiller_numerique_id_pg: z
            .union([z.string(), z.array(z.string())])
            .optional()
            .transform((value) => {
              if (typeof value === 'string') {
                return [value]
              }
              return value
            }),
          soft_deleted: z.union([z.literal('0'), z.literal('1')]).optional(),
        })
        .default({}),
    }),
  )
  .handle(async ({ params }) => {
    const cursorPagination = prismaCursorPagination(params)

    const parsedCursor = cursorPagination.cursor
      ? parseCompositeCursor(cursorPagination.cursor)
      : undefined

    const validatedCursor = parsedCursor
      ? UserCursorValidation.safeParse({
          creation_id: {
            created: parsedCursor[0],
            id: parsedCursor[1],
          },
        })
      : undefined

    if (!!validatedCursor && !validatedCursor.success) {
      throw validatedCursor.error as ZodError
    }

    const supressionFilter =
      params.filter.soft_deleted === '0'
        ? { suppression: null }
        : params.filter.soft_deleted === '1'
          ? { suppression: { not: null } }
          : undefined

    const deletedFilter =
      params.filter.soft_deleted === '0'
        ? {
            deleted: null,
          }
        : params.filter.soft_deleted === '1'
          ? {
              deleted: { not: null },
            }
          : undefined

    const conseillerNumeriqueIds = params.filter.conseiller_numerique_id
    const conseillerNumeriqueIdsPg =
      params.filter.conseiller_numerique_id_pg?.map((id) =>
        Number.parseInt(id, 10),
      )
    const hasConseillerNumeriqueFilter =
      conseillerNumeriqueIds || conseillerNumeriqueIdsPg

    // Used to filter by conseiller_numerique_id or conseiller_numerique_id_pg
    const conseillerNumeriqueIdsFilter = hasConseillerNumeriqueFilter
      ? {
          OR: [
            {
              mediateur: {
                conseillerNumerique: {
                  id: conseillerNumeriqueIds
                    ? {
                        in: conseillerNumeriqueIds,
                      }
                    : undefined,
                  idPg: conseillerNumeriqueIdsPg
                    ? {
                        in: conseillerNumeriqueIdsPg,
                      }
                    : undefined,
                },
              },
            },
            {
              coordinateur: {
                conseillerNumeriqueId: conseillerNumeriqueIds
                  ? {
                      in: conseillerNumeriqueIds,
                    }
                  : undefined,
                conseillerNumeriqueIdPg: conseillerNumeriqueIdsPg
                  ? {
                      in: conseillerNumeriqueIdsPg,
                    }
                  : undefined,
              },
            },
          ],
        }
      : null

    const users = await prismaClient.user.findMany({
      where: {
        inscriptionValidee: {
          not: null,
        },
        role: 'User',
        ...deletedFilter,
        ...conseillerNumeriqueIdsFilter,
      },
      orderBy: [{ created: 'desc' }],
      take: cursorPagination.take,
      skip: cursorPagination.skip,
      cursor: validatedCursor
        ? {
            created_id: {
              created: validatedCursor.data.creation_id.created,
              id: validatedCursor.data.creation_id.id,
            },
          }
        : undefined,
      include: {
        emplois: {
          where: {
            ...supressionFilter,
          },
        },
        mediateur: {
          include: {
            conseillerNumerique: true,
            enActivite: {
              where: {
                ...supressionFilter,
              },
            },
            coordinations: {
              where: {
                ...supressionFilter,
              },
            },
          },
        },
        coordinateur: {
          include: {
            mediateursCoordonnes: {
              where: {
                ...supressionFilter,
              },
            },
          },
        },
      },
    })

    const totalCount = await prismaClient.user.count({
      where: {
        inscriptionValidee: {
          not: null,
        },
        role: 'User',
        ...deletedFilter,
        ...conseillerNumeriqueIdsFilter,
      },
    })

    const lastItem = users.at(-1)
    const firstItem = users.at(0)

    const nextCursor = lastItem
      ? createCompositeCursor(lastItem.created.toISOString(), lastItem.id)
      : undefined
    const previousCursor =
      !!parsedCursor && firstItem
        ? createCompositeCursor(firstItem.created.toISOString(), firstItem.id)
        : undefined

    const response: UtilisateurListResponse = {
      data: users.map((u) => ({
        type: 'utilisateur',
        id: u.id,
        attributes: {
          email: u.email,
          prenom: u.firstName ?? null,
          nom: u.lastName ?? null,
          inscription_validee: u.inscriptionValidee
            ? u.inscriptionValidee.toISOString()
            : null,
          telephone: u.phone ?? null,
          creation: u.created.toISOString(),
          modification: u.updated.toISOString(),
          suppression: u.deleted?.toISOString() ?? null,
          emplois: u.emplois.map((emploi) => ({
            id: emploi.id,
            structure_id: emploi.structureId,
            creation: emploi.creation.toISOString(),
            modification: emploi.modification.toISOString(),
            suppression: emploi.suppression?.toISOString() ?? null,
          })),
          mediateur: u.mediateur
            ? {
                id: u.mediateur.id,
                creation: u.mediateur.creation.toISOString(),
                modification: u.mediateur.modification.toISOString(),
                en_activite: u.mediateur.enActivite.map((ma) => ({
                  id: ma.id,
                  structure_id: ma.structureId,
                  creation: ma.creation.toISOString(),
                  modification: ma.modification.toISOString(),
                  suppression: ma.suppression
                    ? ma.suppression.toISOString()
                    : null,
                })),
                coordinations: u.mediateur.coordinations.map((mc) => ({
                  id: mc.id,
                  creation: mc.creation.toISOString(),
                  modification: mc.modification.toISOString(),
                  suppression: mc.suppression
                    ? mc.suppression.toISOString()
                    : null,
                  coordinateur_id: mc.coordinateurId,
                })),
              }
            : null,
          coordinateur: u.coordinateur
            ? {
                id: u.coordinateur.id,
                creation: u.coordinateur.creation.toISOString(),
                modification: u.coordinateur.modification.toISOString(),
                mediateurs_coordonnes: u.coordinateur.mediateursCoordonnes.map(
                  (mc) => ({
                    id: mc.id,
                    creation: mc.creation.toISOString(),
                    modification: mc.modification.toISOString(),
                    suppression: mc.suppression?.toISOString() ?? null,
                    mediateur_id: mc.mediateurId,
                  }),
                ),
              }
            : null,
          conseiller_numerique: u.mediateur?.conseillerNumerique?.id
            ? {
                id: u.mediateur.conseillerNumerique.id,
                id_pg: u.mediateur.conseillerNumerique.idPg ?? null,
              }
            : u.coordinateur?.conseillerNumeriqueId
              ? {
                  id: u.coordinateur.conseillerNumeriqueId,
                  id_pg: u.coordinateur.conseillerNumeriqueIdPg ?? null,
                }
              : null,
        },
      })),
      links: {
        self: {
          href: cursorPagination.cursor
            ? cursorPagination.isBefore
              ? apiV1Url(
                  `/utilisateurs?page[before]=${encodeSerializableState(
                    cursorPagination.cursor,
                  )}`,
                )
              : apiV1Url(
                  `/utilisateurs?page[after]=${encodeSerializableState(
                    cursorPagination.cursor,
                  )}`,
                )
            : apiV1Url('/utilisateurs'),
        },
        next: nextCursor
          ? {
              href: apiV1Url(
                `/utilisateurs?page[after]=${encodeSerializableState(
                  nextCursor,
                )}`,
              ),
            }
          : undefined,
        prev: previousCursor
          ? {
              href: apiV1Url(
                `/utilisateurs?page[before]=${encodeSerializableState(
                  previousCursor,
                )}`,
              ),
            }
          : undefined,
      },
      meta: {
        total_count: totalCount,
        items_per_page: cursorPagination.take,
        total_pages: Math.ceil(totalCount / cursorPagination.take),
        has_next_page: !!nextCursor,
        has_prev_page: !!previousCursor,
      },
    }

    return NextResponse.json(response)
  })
