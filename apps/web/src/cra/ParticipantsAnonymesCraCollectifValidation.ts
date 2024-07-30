import z from 'zod'
import {
  countTotalGenre,
  countTotalStatutSocial,
  countTotalTrancheAge,
} from '@app/web/cra/participantsAnonymes'
import { numberToString } from '@app/web/utils/formatNumber'

const participantsAnonymesMax = 10_000
const participantsAnonymesMaxLocaleString = numberToString(
  participantsAnonymesMax,
)

const participantsAnonymeNumber = ({ maxMessage }: { maxMessage: string }) =>
  z.coerce
    .number()
    .int({
      message: 'Veuillez renseigner un nombre entier',
    })
    .max(participantsAnonymesMax, maxMessage)

export const ParticipantsAnonymesCraCollectifValidation = z
  .object({
    id: z.string().uuid().nullish(), //  defined if update, nullish if create

    total: participantsAnonymeNumber({
      maxMessage: `Le nombre total de participants anonymes ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),

    genreFeminin: participantsAnonymeNumber({
      maxMessage: `Le nombre de participants anonymes de genre féminin ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),
    genreMasculin: participantsAnonymeNumber({
      maxMessage: `Le nombre de participants anonymes de genre masculin ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),
    genreNonCommunique: participantsAnonymeNumber({
      maxMessage: `Le nombre de participants anonymes de genre non communiqué ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),

    trancheAgeMineur: participantsAnonymeNumber({
      maxMessage: `Le nombre de participants anonymes de tranche d’âge mineur ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),
    trancheAgeDixHuitVingtQuatre: participantsAnonymeNumber({
      maxMessage: `Le nombre de participants anonymes de tranche d’âge 18-24 ans ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),
    trancheAgeVingtCinqTrenteNeuf: participantsAnonymeNumber({
      maxMessage: `Le nombre de participants anonymes de tranche d’âge 25-39 ans ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),
    trancheAgeQuaranteCinquanteNeuf: participantsAnonymeNumber({
      maxMessage: `Le nombre de participants anonymes de tranche d’âge 40-59 ans ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),
    trancheAgeSoixanteSoixanteNeuf: participantsAnonymeNumber({
      maxMessage: `Le nombre de participants anonymes de tranche d’âge 60-69 ans ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),
    trancheAgeSoixanteDixPlus: participantsAnonymeNumber({
      maxMessage: `Le nombre de participants anonymes de tranche d’âge 70 ans et plus ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),
    trancheAgeNonCommunique: participantsAnonymeNumber({
      maxMessage: `Le nombre de participants anonymes de tranche d’âge non communiqué ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),

    statutSocialScolarise: participantsAnonymeNumber({
      maxMessage: `Le nombre de participants anonymes scolarisés ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),
    statutSocialSansEmploi: participantsAnonymeNumber({
      maxMessage: `Le nombre de participants anonymes sans emploi ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),
    statutSocialEnEmploi: participantsAnonymeNumber({
      maxMessage: `Le nombre de participants anonymes en emploi ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),
    statutSocialRetraite: participantsAnonymeNumber({
      maxMessage: `Le nombre de participants anonymes retraités ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),
    statutSocialNonCommunique: participantsAnonymeNumber({
      maxMessage: `Le nombre de participants anonymes de statut social non communiqué ne doit pas dépasser ${participantsAnonymesMaxLocaleString}`,
    }),
  })
  .refine((data) => countTotalGenre(data) <= (data.total ?? 0), {
    message:
      'La somme des genres ne doit pas dépasser le total des participants anonymes',
    path: ['total'],
  })
  .refine((data) => countTotalTrancheAge(data) <= (data.total ?? 0), {
    message:
      'La somme des tranches d’âges ne doit pas dépasser le total des participants anonymes',
    path: ['total'],
  })
  .refine((data) => countTotalStatutSocial(data) <= (data.total ?? 0), {
    message:
      'La somme des statuts sociaux ne doit pas dépasser le total des participants anonymes',
    path: ['total'],
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
