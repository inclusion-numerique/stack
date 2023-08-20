import z from 'zod'

export const PorterOuParticiperValidation = z.object({
  formulaireGouvernanceId: z.string().uuid(),
  intention: z.enum(['Porter', 'Participer'], {
    required_error: 'Veuillez choisir une option',
  }),
})

export type PorterOuParticiperData = z.infer<
  typeof PorterOuParticiperValidation
>
