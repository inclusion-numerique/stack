import z from 'zod'
import {
  autonomieValues,
  dureeAccompagnementValues,
  lieuAccompagnementValues,
  materielValues,
  poursuiteAccompagnementValues,
  thematiqueAccompagnementValues,
} from '@app/web/cra/cra'
import { BeneficiaireValidation } from '@app/web/beneficiaire/BeneficiaireValidation'

export const CraIndividuelValidation = z.object({
  id: z.string().uuid().nullish(), // defined if update, nullish if create
  mediateurId: z.string().uuid(), // owner of the CRA

  beneficiaire: BeneficiaireValidation,

  date: z
    .string({ required_error: 'Veuillez renseigner une date' })
    .date('Veuillez renseigner une date valide'),
  duree: z.enum(dureeAccompagnementValues, {
    required_error: 'Veuillez renseigner une durée',
  }),
  lieuAccompagnement: z.enum(lieuAccompagnementValues, {
    required_error: 'Veuillez renseigner un lieu d’accompagnement',
  }),
  lieuActiviteId: z.string().uuid().nullish(),
  codeCommuneDomicile: z
    .string()
    .length(5, 'Veuillez renseigner une commune valide')
    .nullish(),
  materiel: z.array(z.enum(materielValues)).default([]),
  thematiques: z.array(z.enum(thematiqueAccompagnementValues)).default([]),
  autonomie: z.enum(autonomieValues).nullish(),
  poursuiteAccompagnement: z
    .array(z.enum(poursuiteAccompagnementValues))
    .default([]),
  poursuiteAccompagnementStructureId: z.string().uuid().nullish(),
  notes: z.string().nullish(),
})

export type CraIndividuelData = z.infer<typeof CraIndividuelValidation>
