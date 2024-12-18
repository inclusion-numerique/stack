import z from 'zod'

export const InvitationValidation = z.object({
  email: z.string().email(),
  coordinateurId: z.string(),
})

export type Invitation = z.infer<typeof InvitationValidation>
