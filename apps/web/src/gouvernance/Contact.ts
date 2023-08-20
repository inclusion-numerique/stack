import z from 'zod'

export const ContactFormulaireGouvernanceValidation = z.object({
  nom: z
    .string({
      required_error: 'Veuillez renseigner un nom',
    })
    .min(1, { message: 'Veuillez renseigner un nom' }),
  prenom: z
    .string({
      required_error: 'Veuillez renseigner un prénom',
    })
    .min(1, { message: 'Veuillez renseigner un prénom' }),
  fonction: z
    .string({
      required_error: 'Veuillez renseigner une fonction',
    })
    .min(1, { message: 'Veuillez renseigner une fonction' }),
  email: z
    .string({
      required_error: 'Veuillez renseigner un email',
    })
    .email({ message: 'Veuillez renseigner un email valide' }),
})

export type ContactFormulaireGouvernanceData = z.infer<
  typeof ContactFormulaireGouvernanceValidation
>
