import z from 'zod'

export const TypesDePublicsAccueillisShape = {
  priseEnChargeSpecifique: z.array(z.string()).nullish(),
  toutPublic: z.boolean().nullish(),
  publicsSpecifiquementAdresses: z.array(z.string()).nullish(),
}

export const TypesDePublicsAccueillisValidation = z.object({
  id: z.string().uuid(),
  ...TypesDePublicsAccueillisShape,
})

export type TypesDePublicsAccueillisData = z.infer<
  typeof TypesDePublicsAccueillisValidation
>
