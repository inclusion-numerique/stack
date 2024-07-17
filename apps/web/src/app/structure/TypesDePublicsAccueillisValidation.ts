import z from 'zod'

export const TypesDePublicsAccueillisValidation = z.object({
  id: z.string().uuid(),
  priseEnChargeSpecifique: z.array(z.string()).nullish(),
  toutPublic: z.boolean().nullish(),
  publicsSpecifiquementAdresses: z.array(z.string()).nullish(),
})

export type TypesDePublicsAccueillisData = z.infer<
  typeof TypesDePublicsAccueillisValidation
>
