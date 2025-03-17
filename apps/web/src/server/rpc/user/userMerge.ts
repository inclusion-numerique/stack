import z from 'zod'

export const UserMergeValidation = z.object({
  sourceUserId: z.string(),
  targetUserId: z.string(),
})
