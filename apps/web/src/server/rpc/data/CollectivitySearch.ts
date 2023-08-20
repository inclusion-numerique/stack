import z from 'zod'

export const CollectivitySearchValidation = z.object({
  query: z.string().default(''),
  commune: z.boolean().default(true),
  epci: z.boolean().default(false),
  limit: z.number().int().max(100).default(10),
})

export type CollectivitySearchData = z.infer<
  typeof CollectivitySearchValidation
>
