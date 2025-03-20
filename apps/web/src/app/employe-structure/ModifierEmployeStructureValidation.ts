import z from 'zod'

export const ModifierEmployeStructureValidation = z.object({
  id: z
    .string({
      required_error: 'Veuillez sélectionner un emploi',
    })
    .uuid(),
  creation: z
    .string({ required_error: 'Veuillez renseigner une de début de l’emploi' })
    .date('Veuillez renseigner une date valide'),
  suppression: z.string().nullish(),
})

export type ModifierEmployeStructureData = z.infer<
  typeof ModifierEmployeStructureValidation
>
