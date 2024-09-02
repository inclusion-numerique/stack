import z from 'zod'
import {
  dureeAccompagnementValues,
  lieuAtelierValues,
  materielValues,
  niveauAtelierValues,
  thematiqueValues,
} from '@app/web/cra/cra'
import { BeneficiaireCraValidation } from '@app/web/beneficiaire/BeneficiaireValidation'
import { AdresseBanValidation } from '@app/web/external-apis/ban/AdresseBanValidation'
import { ParticipantsAnonymesCraCollectifValidation } from '@app/web/cra/ParticipantsAnonymesCraCollectifValidation'

export const CraCollectifValidation = z
  .object({
    id: z.string().uuid().nullish(), // defined if update, nullish if create
    mediateurId: z.string().uuid(), // owner of the CRA

    participants: z
      .array(
        BeneficiaireCraValidation.extend({
          id: z.string().uuid(),
        }),
      )
      .default([]),
    participantsAnonymes: ParticipantsAnonymesCraCollectifValidation,
    // Helper field only used in client form for type safety
    addParticipant: BeneficiaireCraValidation.nullish(),

    titreAtelier: z.string().nullish(),

    date: z
      .string({ required_error: 'Veuillez renseigner une date' })
      .date('Veuillez renseigner une date valide'),
    duree: z.enum(dureeAccompagnementValues, {
      required_error: 'Veuillez renseigner une durée',
    }),
    lieuAtelier: z.enum(lieuAtelierValues, {
      required_error: 'Veuillez renseigner un lieu',
    }),
    structureId: z.string().uuid().nullish(),
    lieuAtelierAutreCommune: AdresseBanValidation.nullish(),
    materiel: z.array(z.enum(materielValues)).default([]),
    thematiques: z
      .array(z.enum(thematiqueValues), {
        required_error: 'Veuillez renseigner au moins une thématique',
      })
      .min(1, 'Veuillez renseigner au moins une thématique'),

    niveau: z.enum(niveauAtelierValues).nullish(),
    notes: z.string().nullish(),
  })
  // structureId is required if lieuAtelier ===  LieuActivite
  .refine(
    (data) => {
      if (data.lieuAtelier === 'LieuActivite') {
        return !!data.structureId
      }
      return true
    },
    {
      message: 'Veuillez renseigner le lieu d’activité',
      path: ['structureId'],
    },
  )
  // lieuAtelierAutreCommune is required if lieuAtelier === Autre
  .refine(
    (data) => data.lieuAtelier !== 'Autre' || !!data.lieuAtelierAutreCommune,
    {
      message: 'Veuillez renseigner la commune',
      path: ['lieuAtelierAutreCommune'],
    },
  )

export type CraCollectifData = z.infer<typeof CraCollectifValidation>
