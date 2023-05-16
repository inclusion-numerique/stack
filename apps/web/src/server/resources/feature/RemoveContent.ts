import z from 'zod'

export const RemoveContentCommandValidation = z.object({
  name: z.literal('RemoveContent'),
  payload: z.object({
    resourceId: z.string().uuid(),
    id: z.string().uuid(),
  }),
})

export type RemoveContentCommand = z.infer<
  typeof RemoveContentCommandValidation
>

export type ContentRemovedV1 = {
  __version: 1
  id: string
}

export type ContentRemoved = {
  type: 'ContentRemoved'
  timestamp: Date
  data: ContentRemovedV1
}
