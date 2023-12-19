import z from 'zod'

export const BaseFollowValidation = z.object({
  baseId: z.string().uuid(),
})

export type BaseFollowData = z.infer<typeof BaseFollowValidation>

export const ProfileFollowValidation = z.object({
  profileId: z.string().uuid(),
})

export type ProfileFollowData = z.infer<typeof ProfileFollowValidation>
