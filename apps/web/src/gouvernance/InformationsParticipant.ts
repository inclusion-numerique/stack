import z from 'zod'
import { ContactFormulaireGouvernanceValidation } from '@app/web/gouvernance/Contact'

export const InformationsParticipantCollectiviteValidation = z.object({
  formulaireGouvernanceId: z.string().uuid().nonempty(),
  contactPolitique: ContactFormulaireGouvernanceValidation,
  contactTechnique: ContactFormulaireGouvernanceValidation.nullish(),
  schemaOuGouvernanceLocale: z.string().nullish(),
})

export const InformationsParticipantValidation = z.discriminatedUnion(
  'gouvernancePersona',
  [
    InformationsParticipantCollectiviteValidation.extend({
      gouvernancePersona: z.literal('commune'),
      codeCommune: z.string({
        required_error: 'Veuillez renseigner votre commune',
      }),
    }),
    InformationsParticipantCollectiviteValidation.extend({
      gouvernancePersona: z.literal('epci'),
      codeEpci: z.string({
        required_error: 'Veuillez renseigner votre EPCI',
      }),
    }),
    InformationsParticipantCollectiviteValidation.extend({
      gouvernancePersona: z.literal('conseil-departemental'),
      codeDepartement: z.string({
        required_error: 'Veuillez renseigner votre département',
      }),
    }),
    InformationsParticipantCollectiviteValidation.extend({
      gouvernancePersona: z.literal('conseil-regional'),
      codeRegion: z.string({
        required_error: 'Veuillez renseigner votre région',
      }),
    }),
  ],
)

export type InformationsParticipantData = z.infer<
  typeof InformationsParticipantValidation
>
