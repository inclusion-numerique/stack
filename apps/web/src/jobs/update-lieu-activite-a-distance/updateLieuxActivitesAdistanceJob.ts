import z from 'zod'

export const UpdateLieuxActivitesAdistanceValidation = z.object({
  name: z.literal('update-lieux-activites-a-distance'),
  payload: z.object({}).optional(),
})

export type UpdateLieuxActivitesAdistanceJob = z.infer<
  typeof UpdateLieuxActivitesAdistanceValidation
>
