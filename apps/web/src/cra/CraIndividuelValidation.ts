import z from 'zod'
import {
  autonomieValues,
  materielValues,
  structuresRedirectionValues,
  thematiqueValues,
  typeLieuValues,
} from '@app/web/cra/cra'
import { BeneficiaireCraValidation } from '@app/web/beneficiaire/BeneficiaireValidation'
import { AdresseBanValidation } from '@app/web/external-apis/ban/AdresseBanValidation'
import { yesOrNo } from '@app/web/utils/yesNoBooleanOptions'
import { CraDureeValidation } from '@app/web/cra/CraDureeValidation'

export const CraIndividuelValidation = z
  .object({
    id: z.string().uuid().nullish(), // defined if update, nullish if create
    mediateurId: z.string().uuid(), // owner of the CRA

    beneficiaire: BeneficiaireCraValidation,

    date: z
      .string({ required_error: 'Veuillez renseigner une date' })
      .date('Veuillez renseigner une date valide'),
    duree: CraDureeValidation,
    typeLieu: z.enum(typeLieuValues, {
      required_error: 'Veuillez renseigner un lieu d’accompagnement',
    }),
    structureId: z.string().uuid().nullish(),
    lieuCommuneData: AdresseBanValidation.nullish(),
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
  // structureId is required if typeLieu ===  LieuActivite
  .refine(
    (data) => {
      if (data.typeLieu === 'LieuActivite') {
        return !!data.structureId
      }
      return true
    },
    {
      message: 'Veuillez renseigner le lieu d’activité',
      path: ['structureId'],
    },
  )
  // lieuCommuneData is required if typeLieu === Domicile ou typeLieu === Autre
  .refine(
    (data) =>
      (data.typeLieu !== 'Autre' && data.typeLieu !== 'Domicile') ||
      !!data.lieuCommuneData,
    {
      message: 'Veuillez renseigner la commune',
      path: ['lieuCommuneData'],
    },
  )

export type CraIndividuelData = z.infer<typeof CraIndividuelValidation>
