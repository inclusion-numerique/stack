import z from 'zod'

export const GetCrasConseillerNumeriqueV1QueryParamsValidation = z.object({
  // code insee commune
  commune: z
    .string()
    .regex(/^\d{5}$/)
    .optional(),
  // id coordinateur v1
  coordinateur: z.string().optional(),
  // id conseiller v1
  conseiller: z.string().optional(),
})

export type GetCrasConseillerNumeriqueV1QueryParams = z.infer<
  typeof GetCrasConseillerNumeriqueV1QueryParamsValidation
>
