import z from 'zod'

export const InviterMembreValidation = z.object({
  members: z
    .array(
      z.object({
        email: z.string().email(),
        nom: z.string().optional(),
        mediateurId: z.string().optional(),
      }),
    )
    .default([]),
})

export type InviterMembreData = z.infer<typeof InviterMembreValidation>
