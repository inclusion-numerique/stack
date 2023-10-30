import z from 'zod'
import sanitizeHtml from 'sanitize-html'
import { htmlToText } from '@app/web/utils/htmlToText'

export const collectionTitleMaxLength = 100
export const collectionDescriptionMaxLength = 100

export const CreateCollectionCommandValidation = z.object({
  title: z
    .string({ required_error: 'Veuillez renseigner le nom de la collection' })
    .trim()
    .nonempty('Veuillez renseigner le nom de la collection')
    .max(
      collectionTitleMaxLength,
      `Le titre ne doit pas dépasser ${collectionTitleMaxLength} caractères`,
    ),
  description: z
    .string()
    .trim()
    .refine(
      (text) =>
        !text || htmlToText(text).length <= collectionDescriptionMaxLength,
      {
        message: `La description ne doit pas dépasser ${collectionDescriptionMaxLength} caractères`,
      },
    )
    .optional()
    .transform((text) => (text ? sanitizeHtml(text) : text)),
  imageId: z.string().uuid().nullable().optional(),
  baseId: z.string().uuid().nullable().optional(),
  isPublic: z.boolean({
    required_error: 'Veuillez spécifier la visibilité de la collection',
  }),
})

export type CreateCollectionCommand = z.infer<
  typeof CreateCollectionCommandValidation
>
