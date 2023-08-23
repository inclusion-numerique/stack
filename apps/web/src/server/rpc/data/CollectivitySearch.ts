import z from 'zod'

export const CollectivitySearchValidation = z.object({
  query: z.string().default(''),
  commune: z.boolean().default(true),
  epci: z.boolean().default(false),
  limit: z.number().int().max(100).default(10),
  exclude: z.array(z.string()).default([]),
})

export type CollectivitySearchData = z.infer<
  typeof CollectivitySearchValidation
>
