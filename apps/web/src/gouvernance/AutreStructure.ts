import { z } from 'zod'
import { ContactFormulaireGouvernanceValidation } from '@app/web/gouvernance/Contact'

const EnregistrerAutreStructure = z.object({
  action: z.literal('enregistrer'),
  formulaireGouvernanceId: z.string().uuid(),
  participantId: z.string().uuid().nullish(),
  nom: z.string(),
  contact: ContactFormulaireGouvernanceValidation,
})

const SupprimerAutreStructure = z.object({
  action: z.literal('supprimer'),
  formulaireGouvernanceId: z.string().uuid(),
  participantId: z.string().uuid(),
})

export const AutreStructureValidation = z.discriminatedUnion('action', [
  EnregistrerAutreStructure,
  SupprimerAutreStructure,
])

export type AutreStructureData = z.infer<typeof AutreStructureValidation>
