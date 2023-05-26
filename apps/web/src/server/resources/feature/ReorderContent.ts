import z from 'zod'

export const ReorderContentCommandValidation = z.object({
  name: z.literal('ReorderContent'),
  payload: z.object({
    resourceId: z.string().uuid(),
    id: z.string().uuid(),
    order: z.number().int(),
  }),
})

export type ReorderContentCommand = z.infer<
  typeof ReorderContentCommandValidation
>

export type ContentReorderedV1 = {
  __version: 1
  id: string
  order: number
}

export type ContentReordered = {
  type: 'ContentReordered'
  timestamp: Date
  data: ContentReorderedV1
}
