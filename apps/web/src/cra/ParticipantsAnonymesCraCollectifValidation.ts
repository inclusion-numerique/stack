import z from 'zod'
import {
  countTotalGenre,
  countTotalStatutSocial,
  countTotalTrancheAge,
} from '@app/web/cra/participantsAnonymes'

export const ParticipantsAnonymesCraCollectifValidation = z
  .object({
    id: z.string().uuid().nullish(), //  defined if update, nullish if create

    total: z.number().int(),

    genreFeminin: z.number().int(),
    genreMasculin: z.number().int(),
    genreNonCommunique: z.number().int(),

    trancheAgeMineur: z.number().int(),
    trancheAgeDixHuitVingtQuatre: z.number().int(),
    trancheAgeVingtCinqTrenteNeuf: z.number().int(),
    trancheAgeQuaranteCinquanteNeuf: z.number().int(),
    trancheAgeSoixanteSoixanteNeuf: z.number().int(),
    trancheAgeSoixanteDixPlus: z.number().int(),
    trancheAgeNonCommunique: z.number().int(),

    statutSocialScolarise: z.number().int(),
    statutSocialSansEmploi: z.number().int(),
    statutSocialEnEmploi: z.number().int(),
    statutSocialRetraite: z.number().int(),
    statutSocialNonCommunique: z.number().int(),
  })
  .refine((data) => countTotalGenre(data) > (data.total ?? 0), {
    message:
      'La somme des genres ne doit pas dépasser le total des participants anonymes',
    path: ['genreNonCommunique'],
  })
  .refine((data) => countTotalTrancheAge(data) > (data.total ?? 0), {
    message:
      'La somme des tranches d’âges ne doit pas dépasser le total des participants anonymes',
  })
  .refine((data) => countTotalStatutSocial(data) > (data.total ?? 0), {
    message:
      'La somme des statuts sociaux ne doit pas dépasser le total des participants anonymes',
  })

// Cannot infer as the count functions would recursively type fail
export type ParticipantsAnonymesCraCollectifData = {
  id: string | null | undefined

  total: number

  genreFeminin: number
  genreMasculin: number
  genreNonCommunique: number

  trancheAgeMineur: number
  trancheAgeDixHuitVingtQuatre: number
  trancheAgeVingtCinqTrenteNeuf: number
  trancheAgeQuaranteCinquanteNeuf: number
  trancheAgeSoixanteSoixanteNeuf: number
  trancheAgeSoixanteDixPlus: number
  trancheAgeNonCommunique: number

  statutSocialScolarise: number
  statutSocialSansEmploi: number
  statutSocialEnEmploi: number
  statutSocialRetraite: number
  statutSocialNonCommunique: number
}

export type ParticipantsAnonymesCraCollectifDataKey =
  keyof ParticipantsAnonymesCraCollectifData
