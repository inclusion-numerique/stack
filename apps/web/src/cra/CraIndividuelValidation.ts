import z from 'zod'
import {
  autonomieValues,
  dureeAccompagnementValues,
  lieuAccompagnementValues,
  materielValues,
  structuresRedirectionValues,
  thematiqueAccompagnementValues,
} from '@app/web/cra/cra'
import { BeneficiaireValidation } from '@app/web/beneficiaire/BeneficiaireValidation'
import { AdresseBanValidation } from '@app/web/external-apis/ban/AdresseBanValidation'
import { yesOrNo } from '@app/web/utils/yesNoBooleanOptions'

export const CraIndividuelValidation = z
  .object({
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
    lieuAccompagnementDomicileCommune: AdresseBanValidation.nullish(),
    materiel: z.array(z.enum(materielValues)).default([]),
    thematiques: z
      .array(z.enum(thematiqueAccompagnementValues), {
        required_error: 'Veuillez renseigner au moins une thématique',
      })
      .min(1, 'Veuillez renseigner au moins une thématique'),
    autonomie: z.enum(autonomieValues).nullish(),
    orienteVersStructure: z.enum(yesOrNo).nullish(),
    structureDeRedirection: z.enum(structuresRedirectionValues).nullish(),
    notes: z.string().nullish(),
  })
  // lieuActiviteId is required if lieuAccompagnement ===  LieuActivite
  .refine((data) => {
    if (data.lieuAccompagnement === 'LieuActivite') {
      return !!data.lieuActiviteId
    }
    return true
  }, 'Veuillez renseigner le lieu d’activité')
  // lieuAccompagnementDomicileCommune is required if lieuAccompagnement === Domicile
  .refine(
    (data) =>
      data.lieuAccompagnement !== 'Domicile' ||
      !!data.lieuAccompagnementDomicileCommune,
    'Veuillez renseigner la commune',
  )

export type CraIndividuelData = z.infer<typeof CraIndividuelValidation>
