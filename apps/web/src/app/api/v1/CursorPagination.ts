/**
 * We use cursor pagination for the v1 list endpoints
 * See why: https://jsonapi.org/profiles/ethanresnick/cursor-pagination/
 */
import { z } from 'zod'

export const JsonApiCursorPaginationQueryParamsValidation = z.object({
  page: z.object({
    size: z.coerce.number().min(1).max(500).default(500),
    after: z.string().optional(),
    before: z.string().optional(),
  }),
})

export type JsonApiCursorPaginationQueryParams = z.infer<
  typeof JsonApiCursorPaginationQueryParamsValidation
>

export const prismaCursorPagination = (
  cursorQueryParams: JsonApiCursorPaginationQueryParams,
) => {
  const take = cursorQueryParams.page.size

  const cursor = cursorQueryParams.page.after || cursorQueryParams.page.before

  if (!cursor) return { take, skip: undefined, cursor: undefined }

  const isBefore = !!cursorQueryParams.page.before

  return {
    isBefore,
    take: isBefore ? -take : take,
    skip: 1,
    cursor,
  }
}
