import z from 'zod'

export const FixCoordinationsV1JobValidation = z.object({
  name: z.literal('fix-coordinations-v1'),
  payload: z.object({}).default({}),
})

export type FixCoordinationsV1Job = z.infer<
  typeof FixCoordinationsV1JobValidation
>
