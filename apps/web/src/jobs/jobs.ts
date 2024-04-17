import z from 'zod'

export const UpdateDataInclusionStructuresJobValidation = z.object({
  name: z.literal('update-data-inclusion-structures'),
})

export type UpdateDataInclusionStructuresJob = z.infer<
  typeof UpdateDataInclusionStructuresJobValidation
>

export const JobValidation = z.discriminatedUnion('name', [
  UpdateDataInclusionStructuresJobValidation,
])
