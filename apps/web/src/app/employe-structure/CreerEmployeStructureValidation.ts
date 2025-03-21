import { StructureCreationValidationWithSiret } from '@app/web/app/structure/StructureValidation'
import z from 'zod'

export const CreerEmployeStructureValidation = z.object({
  userId: z
    .string({
      required_error: 'Veuillez sélectionner un utilisateur',
    })
    .uuid(),
  structureEmployeuse: StructureCreationValidationWithSiret,
  creation: z
    .string({ required_error: 'Veuillez renseigner une de début de l’emploi' })
    .date('Veuillez renseigner une date valide'),
  suppression: z.string().nullish(),
})

export type CreerEmployeStructureData = z.infer<
  typeof CreerEmployeStructureValidation
>
