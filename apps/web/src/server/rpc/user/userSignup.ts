import z from 'zod'
import { gouvernancePersonaIds } from '@app/web/app/(public)/gouvernance/gouvernancePersona'

export const emailValidation = z
  .string({ required_error: 'Veuillez renseigner votre email' })
  .trim()
  .toLowerCase()
  .email('Merci de renseigner un email valide')

export const UserSignupValidation = z.object({
  email: emailValidation,
  gouvernancePersonaId: z.enum(gouvernancePersonaIds).nullish(),
  firstName: z
    .string({ required_error: 'Veuillez renseigner votre prénom' })
    .trim()
    .min(1, 'Veuillez renseigner votre prénom')
    .nullish(),
  lastName: z
    .string({ required_error: 'Veuillez renseigner votre nom' })
    .trim()
    .min(1, 'Veuillez renseigner votre nom')
    .nullish(),
})

export type UserSignup = z.infer<typeof UserSignupValidation>

export const UserGouvernanceSignupValidation = UserSignupValidation.extend({
  gouvernancePersonaId: z.enum(gouvernancePersonaIds, {
    required_error: 'Veuillez renseigner un contexte de gouvernance',
  }),
})

export type UserGouvernanceSignup = z.infer<
  typeof UserGouvernanceSignupValidation
>
