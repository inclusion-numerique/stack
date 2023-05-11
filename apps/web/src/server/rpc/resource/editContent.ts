import z from 'zod'
import { resourceSectionTitleMaxLength } from './utils'

export const editResourceContentValidation = z.object({
  id: z.string(),
  title: z
    .string({ required_error: 'Veuillez renseigner le titre' })
    .trim()
    .nonempty('Veuillez renseigner le titre')
    .max(
      resourceSectionTitleMaxLength,
      `Le titre ne doit pas dépasser ${resourceSectionTitleMaxLength} caractères`,
    ),
})
export type EditResourceContent = z.infer<typeof editResourceContentValidation>
