import z from 'zod'

export const TypesDePublicsAccueillisCommandValidation = z.object({
  priseEnChargeSpecifique: z.array(z.string()).nullish(),
  toutPublic: z.boolean().nullish(),
  publicsSpecifiquementAdresses: z.array(z.string()).nullish(),
})

export type TypesDePublicsAccueillisData = z.infer<
  typeof TypesDePublicsAccueillisCommandValidation
>
