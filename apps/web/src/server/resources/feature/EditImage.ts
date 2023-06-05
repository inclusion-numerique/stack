import z from 'zod'

export const EditImageCommandValidation = z.object({
  name: z.literal('EditImage'),
  payload: z.object({
    resourceId: z.string().uuid(),
    imageId: z.string().uuid().nullable(),
  }),
})

export type EditImageCommand = z.infer<typeof EditImageCommandValidation>

export type ImageEditedDataV1 = {
  __version: 1
  imageId: string | null
}

export type ImageEdited = {
  type: 'ImageEdited'
  timestamp: Date
  data: ImageEditedDataV1
}
