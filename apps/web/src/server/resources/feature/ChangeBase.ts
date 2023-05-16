import z from 'zod'

export const ChangeBaseCommandValidation = z.object({
  name: z.literal('ChangeBase'),
  payload: z.object({
    resourceId: z.string().uuid(),
    baseId: z.string().uuid().nullable(),
  }),
})

export type ChangeBaseCommand = z.infer<typeof ChangeBaseCommandValidation>

export type BaseChangedDataV1 = {
  __version: 1
  baseId: string | null
}

export type BaseChanged = {
  type: 'BaseChanged'
  timestamp: Date
  data: BaseChangedDataV1
}
