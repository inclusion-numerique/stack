import z from 'zod'

export const ChooseIntentionValidation = z.object({
  formulaireGouvernanceId: z.string().uuid(),
  intention: z.enum(['Porter', 'Participer'], {
    required_error: 'Veuillez choisir une option',
  }),
})

export type ChooseIntentionData = z.infer<typeof ChooseIntentionValidation>
