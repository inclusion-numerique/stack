import z from 'zod'
import { resourceTitleMaxLength } from '@app/web/server/rpc/resource/utils'

export const EditContentCommandValidation = z.object({
  name: z.literal('EditContent'),
  payload: z.object({
    resourceId: z.string().uuid(),
    id: z.string().uuid(),
    // TODO factorize with AddContentCommandValidation
    title: z
      .string({ required_error: 'Veuillez renseigner le titre' })
      .trim()
      .nonempty('Veuillez renseigner le titre')
      .max(
        resourceTitleMaxLength,
        `Le titre ne doit pas dépasser ${resourceTitleMaxLength} caractères`,
      ),
  }),
})

export type EditContentCommand = z.infer<typeof EditContentCommandValidation>

export type ContentEditedV1 = {
  __version: 1
  id: string
  title: string
}

export type ContentEdited = {
  type: 'ContentEdited'
  timestamp: Date
  data: ContentEditedV1
}
