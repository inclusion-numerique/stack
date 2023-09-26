import z from 'zod'

export const UpdateProfileVisibilityCommandValidation = z.object({
  isPublic: z.boolean({
    required_error: 'Veuillez spécifier la visibilité du profil',
  }),
})

export type UpdateProfileVisibilityCommand = z.infer<
  typeof UpdateProfileVisibilityCommandValidation
>

export type UpdateProfileCommand = UpdateProfileVisibilityCommand