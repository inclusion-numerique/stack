import z from 'zod'
import { ContactFormulaireGouvernanceValidation } from '@app/web/gouvernance/Contact'

export const ParticiperCollectiviteValidation = z.object({
  formulaireGouvernanceId: z.string().uuid().nonempty(),
  contactPolitique: ContactFormulaireGouvernanceValidation,
  contactTechnique: ContactFormulaireGouvernanceValidation.nullish(),
})

export type ParticiperCollectiviteData = z.infer<
  typeof ParticiperCollectiviteValidation
>

export const ParticiperStructureValidation = z.object({
  formulaireGouvernanceId: z.string().uuid().nonempty(),
  nomStructure: z.string({
    required_error: 'Veuillez renseigner le nom de la structure',
  }),
  siretStructure: z.string({
    required_error: 'Veuillez renseigner le SIRET',
  }),
  codeDepartement: z.string({
    required_error: 'Veuillez renseigner le département',
  }),
  contactStructure: ContactFormulaireGouvernanceValidation,
})

export type ParticiperStructureData = z.infer<
  typeof ParticiperStructureValidation
>

export const ParticiperValidation = z.discriminatedUnion('gouvernancePersona', [
  ParticiperCollectiviteValidation.extend({
    gouvernancePersona: z.literal('commune'),
    codeCommune: z.string({
      required_error: 'Veuillez renseigner votre commune',
    }),
  }),
  ParticiperCollectiviteValidation.extend({
    gouvernancePersona: z.literal('epci'),
    codeEpci: z.string({
      required_error: 'Veuillez renseigner votre EPCI',
    }),
  }),
  ParticiperCollectiviteValidation.extend({
    gouvernancePersona: z.literal('conseil-departemental'),
    codeDepartement: z.string({
      required_error: 'Veuillez renseigner votre département',
    }),
  }),
  ParticiperCollectiviteValidation.extend({
    gouvernancePersona: z.literal('conseil-regional'),
    codeRegion: z.string({
      required_error: 'Veuillez renseigner votre région',
    }),
  }),
  ParticiperStructureValidation.extend({
    gouvernancePersona: z.literal('structure'),
  }),
])

export type ParticiperData = z.infer<typeof ParticiperValidation>
