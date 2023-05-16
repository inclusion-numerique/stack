import z from 'zod'
import { resourceTitleMaxLength } from '@app/web/server/rpc/resource/utils'
import { ContentType } from '@prisma/client'

export const AddContentCommandValidation = z.object({
  name: z.literal('AddContent'),
  payload: z.object({
    // TODO use type as a segregated union (see command validation)
    resourceId: z.string().uuid(),
    type: z.nativeEnum(ContentType),
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

export type AddContentCommand = z.infer<typeof AddContentCommandValidation>

export type ContentAddedV1 = {
  __version: 1
  id: string
  type: ContentType
  // TODO add the other content types
  title: string
}

export type ContentAdded = {
  type: 'ContentAdded'
  timestamp: Date
  data: ContentAddedV1
}
