import z from 'zod'
import { descriptionMaxLength } from './CreerStructureValidation'

export const DescriptionCommandValidation = z.object({
  typologies: z.array(z.string()).nullish(),
  presentationResume: z
    .string()
    .max(
      descriptionMaxLength,
      `Cette description doit faire moins de ${descriptionMaxLength} caractères`,
    )
    .nullish(),
  presentationDetail: z.string().nullish(),
})

export type DescriptionData = z.infer<typeof DescriptionCommandValidation>
