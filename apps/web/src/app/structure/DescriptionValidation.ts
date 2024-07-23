import z from 'zod'

export const descriptionMaxLength = 280

export const DescriptionShape = {
  typologies: z.array(z.string()).nullish(),
  presentationResume: z
    .string()
    .max(
      descriptionMaxLength,
      `Cette description doit faire moins de ${descriptionMaxLength} caractères`,
    )
    .trim()
    .nullish(),
  presentationDetail: z.string().trim().nullish(),
}

export const DescriptionValidation = z.object({
  id: z.string().uuid(),
  ...DescriptionShape,
})

export type DescriptionData = z.infer<typeof DescriptionValidation>
