import z from 'zod'

export const objectFormValidation = z
  .object({
    name: z.string(),
  })
  .strict()

export type ObjectFormData = z.infer<typeof objectFormValidation>
