import z from 'zod'
import {
  autonomieValues,
  degreDeFinalisationDemarcheValues,
  dureeAccompagnementValues,
  lieuAccompagnementValues,
  structuresRedirectionValues,
  thematiqueDemarcheAdministrativeValues,
} from '@app/web/cra/cra'
import { BeneficiaireCraValidation } from '@app/web/beneficiaire/BeneficiaireValidation'
import { AdresseBanValidation } from '@app/web/external-apis/ban/AdresseBanValidation'

export const CraDemarcheAdministrativeValidation = z
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
    lieuActiviteId: z.string().uuid().nullish(),
    lieuAccompagnementDomicileCommune: AdresseBanValidation.nullish(),
    thematiques: z
      .array(z.enum(thematiqueDemarcheAdministrativeValues), {
        required_error: 'Veuillez renseigner au moins une thématique',
      })
      .min(1, 'Veuillez renseigner au moins une thématique'),
    precisionsDemarche: z.string().nullish(),
    autonomie: z.enum(autonomieValues).nullish(),
    degreDeFinalisation: z.enum(degreDeFinalisationDemarcheValues).nullish(),
    structureDeRedirection: z.enum(structuresRedirectionValues).nullish(),
    notes: z.string().nullish(),
  })
  // lieuActiviteId is required if lieuAccompagnement ===  LieuActivite
  .refine(
    (data) => {
      if (data.lieuAccompagnement === 'LieuActivite') {
        return !!data.lieuActiviteId
      }
      return true
    },
    {
      message: 'Veuillez renseigner le lieu d’activité',
      path: ['lieuActiviteId'],
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

export type CraDemarcheAdministrativeData = z.infer<
  typeof CraDemarcheAdministrativeValidation
>
