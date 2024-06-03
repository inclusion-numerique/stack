import z from 'zod'

export const UpdateStructuresCartographieNationaleJobValidation = z.object({
  name: z.literal('update-structures-cartographie-nationale'),
  payload: z.undefined(),
})

export type UpdateStructuresCartographieNationaleJob = z.infer<
  typeof UpdateStructuresCartographieNationaleJobValidation
>
