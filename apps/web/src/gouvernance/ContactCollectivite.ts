import { z } from 'zod'
import { ContactFormulaireGouvernanceValidation } from '@app/web/gouvernance/Contact'

export const ContactCollectiviteValidation =
  ContactFormulaireGouvernanceValidation.extend({
    formulaireGouvernanceId: z.string().uuid(),
    type: z.enum(['commune', 'epci', 'departement']),
    participantId: z.string().uuid(),
  })

export type ContactCollectiviteData = z.infer<
  typeof ContactCollectiviteValidation
>
