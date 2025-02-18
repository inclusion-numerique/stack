import z from 'zod'

export const ResetInscriptionUtilisateurValidation = z.object({
  userId: z
    .string({
      required_error: 'Veuillez renseigner l’id de l’utilisateur',
    })
    .uuid('Veuillez renseigner un id valide'),
})

export type ResetInscriptionUtilisateurData = z.infer<
  typeof ResetInscriptionUtilisateurValidation
>
