import z from 'zod'

export const GouvernanceIdValidation = z.object({
  gouvernanceId: z.string().uuid(),
})

export type AnnulerData = z.infer<typeof GouvernanceIdValidation>
