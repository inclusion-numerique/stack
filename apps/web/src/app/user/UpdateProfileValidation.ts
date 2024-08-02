import z from 'zod'

export const UpdateProfileValidation = z.object({
  firstName: z
    .string({
      required_error: 'Veuillez renseigner un prénom',
      invalid_type_error: 'Veuillez renseigner un prénom',
    })
    .trim()
    .min(1, 'Veuillez renseigner un prénom'),
  lastName: z
    .string({
      required_error: 'Veuillez renseigner un nom',
      invalid_type_error: 'Veuillez renseigner un nom',
    })
    .trim()
    .min(1, 'Veuillez renseigner un nom'),
  phone: z.string().nullish(),
  role: z.string().nullish(),
})

export type UpdateProfileData = z.infer<typeof UpdateProfileValidation>
