import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'
import { Genre, StatutSocial, TrancheAge } from '@prisma/client'
import type { ParticipantsAnonymesCraCollectifDataKey } from '@app/web/cra/ParticipantsAnonymesCraCollectifValidation'

describe('participantsAnonymes', () => {
  /**
   * This test ensure that the ParticipantsAnonymesCraCollectifData type
   * is correctly defined with a count for each of the modelisation enum values
   */
  describe('ParticipantsAnonymesCraCollectifData', () => {
    const participantsAnonymes = participantsAnonymesDefault

    const genreKeys = Object.keys(Genre).map(
      (key) => `genre${key}`,
    ) as ParticipantsAnonymesCraCollectifDataKey[]

    const trancheAgeKeys = Object.keys(TrancheAge).map(
      (key) => `trancheAge${key}`,
    ) as ParticipantsAnonymesCraCollectifDataKey[]

    const statutSocialKeys = Object.keys(StatutSocial).map(
      (key) => `statutSocial${key}`,
    ) as ParticipantsAnonymesCraCollectifDataKey[]

    it('has a total', () => {
      expect(participantsAnonymes.total).toEqual(0)
    })

    it('has a count for every Genre enum values', () => {
      for (const key of genreKeys) {
        expect(participantsAnonymes[key]).toEqual(0)
      }
    })

    it('has a count for every TrancheAge enum values', () => {
      for (const key of trancheAgeKeys) {
        expect(participantsAnonymes[key]).toEqual(0)
      }
    })

    it('has a count for every StatutSocial enum values', () => {
      for (const key of statutSocialKeys) {
        expect(participantsAnonymes[key]).toEqual(0)
      }
    })

    it('has no additional counts', () => {
      const { total, ...enumCounts } = participantsAnonymes

      const modelKeys = [
        'dejaAccompagne',
        ...genreKeys,
        ...trancheAgeKeys,
        ...statutSocialKeys,
      ]

      expect(Object.keys(enumCounts)).toEqual(modelKeys)
    })
  })
})
