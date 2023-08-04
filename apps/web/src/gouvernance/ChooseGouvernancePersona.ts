import z from 'zod'
import { gouvernancePersonaIds } from '@app/web/app/(public)/gouvernance/gouvernancePersona'

export const ChooseGouvernancePersonaValidation = z.object({
  gouvernancePersonaId: z.enum(gouvernancePersonaIds, {
    required_error: 'Veuillez choisir un formulaire',
  }),
})

export type ChooseGouvernancePersonaData = z.infer<
  typeof ChooseGouvernancePersonaValidation
>
