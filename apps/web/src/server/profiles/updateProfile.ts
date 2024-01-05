import sanitizeHtml from 'sanitize-html'
import z from 'zod'
import { htmlToText } from '@app/web/utils/htmlToText'
import {
  profileDescriptionMaxLength,
  profileLastNameMaxLength,
  profileFirstNameMaxLength,
} from './profileConstraints'

const lastNameValidation = z
  .string({ required_error: 'Veuillez renseigner votre nom' })
  .trim()
  .min(1, 'Veuillez renseigner votre nom')
  .max(
    profileLastNameMaxLength,
    `Le nom ne doit pas dépasser ${profileLastNameMaxLength} caractères`,
  )

const firstNameValidation = z
  .string({ required_error: 'Veuillez renseigner votre prénom' })
  .trim()
  .min(1, 'Veuillez renseigner votre prénom')
  .max(
    profileFirstNameMaxLength,
    `Le prénom ne doit pas dépasser ${profileFirstNameMaxLength} caractères`,
  )

const departmentValidation = z.string().trim().optional()

const descriptionValidation = z
  .string()
  .trim()
  .refine(
    (text) => !text || htmlToText(text).length <= profileDescriptionMaxLength,
    {
      message: `La description ne doit pas dépasser ${profileDescriptionMaxLength} caractères`,
    },
  )
  .optional()
  .transform((text) => (text ? sanitizeHtml(text) : text))

export const UpdateProfileImageCommandValidation = z.object({
  imageId: z.string().uuid().nullable(),
})

export type UpdateProfileImageCommand = z.infer<
  typeof UpdateProfileImageCommandValidation
>

export const UpdateProfileInformationsCommandValidation = z.object({
  lastName: lastNameValidation,
  firstName: firstNameValidation,
  department: departmentValidation,
  description: descriptionValidation,
})

export const UpdateProfileVisibilityCommandValidation = z.object({
  isPublic: z.boolean({
    required_error: 'Veuillez spécifier la visibilité du profil',
  }),
})

export type UpdateProfileInformationsCommand = z.infer<
  typeof UpdateProfileInformationsCommandValidation
>

export type UpdateProfileVisibilityCommand = z.infer<
  typeof UpdateProfileVisibilityCommandValidation
>
