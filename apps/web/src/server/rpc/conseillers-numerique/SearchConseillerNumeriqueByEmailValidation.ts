import z from 'zod'

export const SearchConseillerNumeriqueByEmailValidation = z.object({
  email: z
    .string({
      required_error: 'Veuillez renseigner un email',
    })
    .email('Veuillez renseigner un email valide'),
})

export type SearchConseillerNumeriqueByEmailData = z.infer<
  typeof SearchConseillerNumeriqueByEmailValidation
>
