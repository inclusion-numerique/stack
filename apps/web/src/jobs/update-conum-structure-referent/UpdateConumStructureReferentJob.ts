import z from 'zod'

export const UpdateConumStructureReferentJobValidation = z.object({
  name: z.literal('update-conum-structure-referent'),
  payload: z.undefined(),
})

export type UpdateConumStructureReferentJob = z.infer<
  typeof UpdateConumStructureReferentJobValidation
>
