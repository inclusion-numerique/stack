import z from 'zod'

export const GetCrasConseillerNumeriqueV1InputValidation = z.object({
  codeCommune: z.string().optional(),
  coordinateurV1Id: z.string().optional(),
  conseillerNumeriqueV1Id: z.string().optional(),
  accompagnementSince: z.date().optional(),
  accompagnementUntil: z.date().optional(),
})

export type GetCrasConseillerNumeriqueV1Input = z.infer<
  typeof GetCrasConseillerNumeriqueV1InputValidation
>
