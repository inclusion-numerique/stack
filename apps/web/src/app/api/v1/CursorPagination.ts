/**
 * We use cursor pagination for the v1 list endpoints
 * See why: https://jsonapi.org/profiles/ethanresnick/cursor-pagination/
 */
import { z, ZodError } from 'zod'
import {
  decodeSerializableState,
  EncodedState,
} from '@app/web/utils/encodeSerializableState'

/**
 * @openapi
 * components:
 *   schemas:
 *     ListMetadata:
 *       type: object
 *       properties:
 *         total_count:
 *           description: nombre total d’éléments correspondants à la requête
 *           type: integer
 *           example: 10
 *         items_per_page:
 *           type: integer
 *           description: nombre d’éléments par page
 *           example: 500
 *         total_pages:
 *           description: nombre total de pages
 *           type: integer
 *           example: 2
 *         has_next_page:
 *           description: indique s'il existe une page suivante
 *           type: boolean
 *           example: true
 *         has_prev_page:
 *           description: indique s'il existe une page précédente
 *           type: boolean
 *           example: true
 *     PaginationLinks:
 *       type: object
 *       properties:
 *         self:
 *           type: string
 *           format: uri
 *           description: lien vers cette page
 *           example: "https://api.example.com/v1/activites"
 *         next:
 *           type: string
 *           format: uri
 *           description: lien vers la page suivante
 *           example: "https://api.example.com/v1/activites"
 *         prev:
 *           type: string
 *           format: uri
 *           description: lien vers la page précédente
 *           example: "https://api.example.com/v1/activites"
 */
export const JsonApiCursorPaginationQueryParamsValidation = z.object({
  page: z
    .object({
      size: z.coerce.number().min(1).max(500).default(500),
      after: z.string().optional(),
      before: z.string().optional(),
    })
    .default({}),
})

export type JsonApiCursorPaginationQueryParams = z.infer<
  typeof JsonApiCursorPaginationQueryParamsValidation
>

export const prismaCursorPagination = (
  cursorQueryParams: JsonApiCursorPaginationQueryParams,
) => {
  const take = cursorQueryParams.page.size

  const encodedCursor = (cursorQueryParams.page.after ||
    cursorQueryParams.page.before) as EncodedState<string> | undefined

  if (!encodedCursor) return { take, skip: undefined, cursor: undefined }

  const cursor = decodeSerializableState(encodedCursor, '')

  const isBefore = !!cursorQueryParams.page.before

  if (!cursor) {
    throw new ZodError([
      {
        message: 'Invalid cursor',
        path: isBefore ? ['page', 'before'] : ['page', 'after'],
        code: 'custom',
      },
    ])
  }

  return {
    isBefore,
    take: isBefore ? -take : take,
    skip: 1,
    cursor,
  }
}

export const createCompositeCursor = (...cursorParts: string[]) =>
  cursorParts.join('###')

export const parseCompositeCursor = (compositeCursor: string) =>
  compositeCursor.split('###')
