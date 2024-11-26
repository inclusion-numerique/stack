import { z } from 'zod'

/**
 * We follow the JSON:API standard for query params.
 */
export const ApiV1QueryParamsValidation = z.object({
  'page[cursor]': z.string().optional(),
  filter: z
    .record(
      z.string(),
      z.string().or(z.object({ gt: z.string(), lt: z.string() })),
    )
    .optional(),
  sort: z.string().optional(), // e.g., "field" or "-field"
})

export type ApiV1QueryParams = z.infer<typeof ApiV1QueryParamsValidation>
