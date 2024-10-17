import z from 'zod'

export const ImportCrasConseillerNumeriqueV1JobValidation = z.object({
  name: z.literal('import-cras-conseiller-numerique-v1'),
  payload: z
    .object({
      createdAtSince: z.string().optional(),
      createdAtUntil: z.string().optional(),
      conseillerNumeriqueId: z.string().optional(),
    })
    .default({}),
})

export type ImportCrasConseillerNumeriqueV1Job = z.infer<
  typeof ImportCrasConseillerNumeriqueV1JobValidation
>
