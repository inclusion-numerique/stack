import z from 'zod'

export const SetServciesToSharedLieuxValidation = z.object({
  name: z.literal('set-servcies-to-shared-lieux'),
  payload: z.undefined(),
})

export type SetServciesToSharedLieuxJob = z.infer<
  typeof SetServciesToSharedLieuxValidation
>
