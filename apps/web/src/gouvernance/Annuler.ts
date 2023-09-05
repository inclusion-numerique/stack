import z from 'zod'

export const AnnulerValidation = z.object({
  formulaireGouvernanceId: z.string().uuid(),
})

export type AnnulerData = z.infer<typeof AnnulerValidation>
