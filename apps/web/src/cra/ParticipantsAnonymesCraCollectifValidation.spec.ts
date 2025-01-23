import { ParticipantsAnonymesCraCollectifValidation } from '@app/web/cra/ParticipantsAnonymesCraCollectifValidation'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'

describe('ParticipantsAnonymesCraCollectifValidation', () => {
  const validData = {
    id: null,
    total: 10,

    dejaAccompagne: 5,

    genreFeminin: 3,
    genreMasculin: 3,
    genreNonCommunique: 3,

    trancheAgeMoinsDeDouze: 2,
    trancheAgeDouzeDixHuit: 0,
    trancheAgeDixHuitVingtQuatre: 2,
    trancheAgeVingtCinqTrenteNeuf: 2,
    trancheAgeQuaranteCinquanteNeuf: 2,
    trancheAgeSoixanteSoixanteNeuf: 1,
    trancheAgeSoixanteDixPlus: 1,
    trancheAgeNonCommunique: 0,

    statutSocialScolarise: 3,
    statutSocialSansEmploi: 3,
    statutSocialEnEmploi: 2,
    statutSocialRetraite: 1,
    statutSocialNonCommunique: 1,
  }

  it('should pass validation for default (0) data', () => {
    expect(() =>
      ParticipantsAnonymesCraCollectifValidation.parse(
        participantsAnonymesDefault,
      ),
    ).not.toThrow()
  })

  it('should pass validation for valid data', () => {
    expect(() =>
      ParticipantsAnonymesCraCollectifValidation.parse(validData),
    ).not.toThrow()
  })

  it('should fail validation if genre total exceeds total participants', () => {
    const invalidData = {
      ...validData,
      genreFeminin: 5,
      genreMasculin: 5,
      genreNonCommunique: 5,
    }
    expect(() =>
      ParticipantsAnonymesCraCollectifValidation.parse(invalidData),
    ).toThrow(
      'La somme des genres ne doit pas dépasser le total des participants anonymes',
    )
  })

  it('should fail validation if age group total exceeds total participants', () => {
    const invalidData = {
      ...validData,
      trancheAgeMineur: 5,
      trancheAgeDixHuitVingtQuatre: 5,
    }
    expect(() =>
      ParticipantsAnonymesCraCollectifValidation.parse(invalidData),
    ).toThrow(
      'La somme des tranches d’âges ne doit pas dépasser le total des participants anonymes',
    )
  })

  it('should fail validation if social status total exceeds total participants', () => {
    const invalidData = {
      ...validData,
      statutSocialScolarise: 5,
      statutSocialSansEmploi: 5,
    }
    expect(() =>
      ParticipantsAnonymesCraCollectifValidation.parse(invalidData),
    ).toThrow(
      'La somme des statuts sociaux ne doit pas dépasser le total des participants anonymes',
    )
  })
})
