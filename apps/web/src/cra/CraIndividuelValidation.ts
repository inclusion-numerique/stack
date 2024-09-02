import z from 'zod'
import {
  autonomieValues,
  dureeAccompagnementValues,
  lieuAccompagnementValues,
  materielValues,
  structuresRedirectionValues,
  thematiqueValues,
} from '@app/web/cra/cra'
import { BeneficiaireCraValidation } from '@app/web/beneficiaire/BeneficiaireValidation'
import { AdresseBanValidation } from '@app/web/external-apis/ban/AdresseBanValidation'
import { yesOrNo } from '@app/web/utils/yesNoBooleanOptions'

export const CraIndividuelValidation = z
  .object({
    id: z.string().uuid().nullish(), // defined if update, nullish if create
    mediateurId: z.string().uuid(), // owner of the CRA

    beneficiaire: BeneficiaireCraValidation,

    date: z
      .string({ required_error: 'Veuillez renseigner une date' })
      .date('Veuillez renseigner une date valide'),
    duree: z.enum(dureeAccompagnementValues, {
      required_error: 'Veuillez renseigner une durée',
    }),
    lieuAccompagnement: z.enum(lieuAccompagnementValues, {
      required_error: 'Veuillez renseigner un lieu d’accompagnement',
    }),
    structureId: z.string().uuid().nullish(),
    lieuAccompagnementDomicileCommune: AdresseBanValidation.nullish(),
    materiel: z.array(z.enum(materielValues)).default([]),
    thematiques: z
      .array(z.enum(thematiqueValues), {
        required_error: 'Veuillez renseigner au moins une thématique',
      })
      .min(1, 'Veuillez renseigner au moins une thématique'),
    autonomie: z.enum(autonomieValues).nullish(),
    orienteVersStructure: z.enum(yesOrNo).nullish(),
    structureDeRedirection: z.enum(structuresRedirectionValues).nullish(),
    notes: z.string().nullish(),
  })
  // structureId is required if lieuAccompagnement ===  LieuActivite
  .refine(
    (data) => {
      if (data.lieuAccompagnement === 'LieuActivite') {
        return !!data.structureId
      }
      return true
    },
    {
      message: 'Veuillez renseigner le lieu d’activité',
      path: ['structureId'],
    },
  )
  // lieuAccompagnementDomicileCommune is required if lieuAccompagnement === Domicile
  .refine(
    (data) =>
      data.lieuAccompagnement !== 'Domicile' ||
      !!data.lieuAccompagnementDomicileCommune,
    {
      message: 'Veuillez renseigner la commune',
      path: ['lieuAccompagnementDomicileCommune'],
    },
  )

export type CraIndividuelData = z.infer<typeof CraIndividuelValidation>
