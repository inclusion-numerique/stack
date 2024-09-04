import { v4 } from 'uuid'
import type {
  Beneficiaire,
  Genre,
  Prisma,
  StatutSocial,
  TrancheAge,
} from '@prisma/client'
import { shuffle } from 'lodash-es' // Replace the 5 last digits of the root uuid with the index.toString(10)
import {
  genreValues,
  statutSocialValues,
  trancheAgeValues,
} from '@app/web/beneficiaire/beneficiaire'
import type { ParticipantsAnonymesCraCollectifData } from '@app/web/cra/ParticipantsAnonymesCraCollectifValidation'

// Replace the 5 last digits of the root uuid with the index.toString(10)
// Use padding left with zeros to ensure the length is ok
export const createCounterUuid = (root: string, index: number): string =>
  root.slice(0, -5) + index.toString(10).padStart(5, '0')

export type BeneficiaireForParticipantsAnonymes = Pick<
  Beneficiaire,
  | 'id'
  | 'anonyme'
  | 'attributionsAleatoires'
  | 'trancheAge'
  | 'statutSocial'
  | 'genre'
>

type CreatedBeneficiairesForParticipantsAnonymes =
  Prisma.BeneficiaireUncheckedCreateInput & {
    id: string
    mediateurId: string
    trancheAge: TrancheAge
    statutSocial: StatutSocial
    genre: Genre
    anonyme: true
    attributionsAleatoires: true
  }

export const createBeneficiairesForParticipantsAnonymes = ({
  participantsAnonymes,
  rootUuid = v4(),
  mediateurId,
}: {
  participantsAnonymes: ParticipantsAnonymesCraCollectifData
  rootUuid?: string
  mediateurId: string
}): CreatedBeneficiairesForParticipantsAnonymes[] => {
  const result: CreatedBeneficiairesForParticipantsAnonymes[] = []
  const mutableCounters = { ...participantsAnonymes }

  // while mutableCounters.total > 0
  while (mutableCounters.total > 0) {
    mutableCounters.total -= 1
    const beneficiaireId = createCounterUuid(rootUuid, result.length)

    const genre =
      shuffle(genreValues).find((findGenre) => {
        if (mutableCounters[`genre${findGenre}`] > 0) {
          mutableCounters[`genre${findGenre}`] -= 1
          return true
        }
        return false
      }) ?? 'NonCommunique'

    const statutSocial =
      shuffle(statutSocialValues).find((findStatutSocial) => {
        if (mutableCounters[`statutSocial${findStatutSocial}`] > 0) {
          mutableCounters[`statutSocial${findStatutSocial}`] -= 1
          return true
        }
        return false
      }) ?? 'NonCommunique'

    const trancheAge =
      shuffle(trancheAgeValues).find((findTrancheAge) => {
        if (mutableCounters[`trancheAge${findTrancheAge}`] > 0) {
          mutableCounters[`trancheAge${findTrancheAge}`] -= 1
          return true
        }
        return false
      }) ?? 'NonCommunique'

    result.push({
      id: beneficiaireId,
      mediateurId,
      anonyme: true,
      attributionsAleatoires: true,
      trancheAge,
      statutSocial,
      genre,
    })
  }

  return result
}
