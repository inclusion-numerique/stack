import z from 'zod'

export const UpdateDataInclusionStructuresJobValidation = z.object({
  name: z.literal('update-data-inclusion-structures'),
  payload: z.undefined(),
})

export type UpdateDataInclusionStructuresJob = z.infer<
  typeof UpdateDataInclusionStructuresJobValidation
>
