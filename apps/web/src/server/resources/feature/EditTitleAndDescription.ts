import z from 'zod'
import { resourceEditionValues } from '@app/web/server/rpc/resource/utils'

export const EditTitleAndDescriptionCommandValidation = z.object({
  name: z.literal('EditTitleAndDescription'),
  payload: z.object({
    resourceId: z.string().uuid(),
    title: resourceEditionValues.title,
    description: resourceEditionValues.description,
  }),
})

export type EditTitleAndDescriptionCommand = z.infer<
  typeof EditTitleAndDescriptionCommandValidation
>

export type TitleAndDescriptionEditedDataV1 = {
  __version: 1
  title: string
  description: string
  // Slug is defined only if it needs to change (detected by the command handler)
  slug?: string
}

export type TitleAndDescriptionEdited = {
  type: 'TitleAndDescriptionEdited'
  timestamp: Date
  data: TitleAndDescriptionEditedDataV1
}
