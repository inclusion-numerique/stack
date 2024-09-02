import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'
import { createParticipantsAnonymesForBeneficiaires } from '@app/web/beneficiaire/createParticipantsAnonymesForBeneficiaires'
import { Beneficiaire } from '@prisma/client'

describe('createParticipantsAnonymesForBeneficiaires', () => {
  it('should work for 0 beneficiaires', () => {
    const result = createParticipantsAnonymesForBeneficiaires([])
    expect(result).toEqual({
      participantsAnonymes: { ...participantsAnonymesDefault },
      beneficiairesSuivis: [],
    })
  })

  const cases: {
    description: string
    beneficiaires: Pick<
      Beneficiaire,
      'anonyme' | 'statutSocial' | 'genre' | 'trancheAge'
    >[]
    expected: ReturnType<typeof createParticipantsAnonymesForBeneficiaires>
  }[] = [
    {
      description: 'should handle 1 anonymous beneficiaire',
      beneficiaires: [
        {
          anonyme: true,
          genre: 'Feminin',
          statutSocial: 'Scolarise',
          trancheAge: 'DixHuitVingtQuatre',
        },
      ],
      expected: {
        participantsAnonymes: {
          ...participantsAnonymesDefault,
          total: 1,
          genreFeminin: 1,
          statutSocialScolarise: 1,
          trancheAgeDixHuitVingtQuatre: 1,
        },
        beneficiairesSuivis: [],
      },
    },
    {
      description: 'should handle 1 non-anonymous beneficiaire',
      beneficiaires: [
        {
          anonyme: false,
          genre: 'Masculin',
          statutSocial: 'EnEmploi',
          trancheAge: 'VingtCinqTrenteNeuf',
        },
      ],
      expected: {
        participantsAnonymes: { ...participantsAnonymesDefault },
        beneficiairesSuivis: [
          {
            anonyme: false,
            genre: 'Masculin',
            statutSocial: 'EnEmploi',
            trancheAge: 'VingtCinqTrenteNeuf',
          },
        ],
      },
    },
    {
      description: 'should handle multiple anonymous beneficiaires',
      beneficiaires: [
        {
          anonyme: true,
          genre: 'NonCommunique',
          statutSocial: 'SansEmploi',
          trancheAge: 'QuaranteCinquanteNeuf',
        },
        {
          anonyme: true,
          genre: 'Masculin',
          statutSocial: 'EnEmploi',
          trancheAge: 'VingtCinqTrenteNeuf',
        },
      ],
      expected: {
        participantsAnonymes: {
          ...participantsAnonymesDefault,
          total: 2,
          genreNonCommunique: 1,
          genreMasculin: 1,
          statutSocialSansEmploi: 1,
          statutSocialEnEmploi: 1,
          trancheAgeQuaranteCinquanteNeuf: 1,
          trancheAgeVingtCinqTrenteNeuf: 1,
        },
        beneficiairesSuivis: [],
      },
    },
    {
      description:
        'should handle mixed anonymous and non-anonymous beneficiaires',
      beneficiaires: [
        {
          anonyme: true,
          genre: 'Feminin',
          statutSocial: 'Retraite',
          trancheAge: 'SoixanteDixPlus',
        },
        {
          anonyme: false,
          genre: 'NonCommunique',
          statutSocial: 'NonCommunique',
          trancheAge: 'NonCommunique',
        },
      ],
      expected: {
        participantsAnonymes: {
          ...participantsAnonymesDefault,
          total: 1,
          genreFeminin: 1,
          statutSocialRetraite: 1,
          trancheAgeSoixanteDixPlus: 1,
        },
        beneficiairesSuivis: [
          {
            anonyme: false,
            genre: 'NonCommunique',
            statutSocial: 'NonCommunique',
            trancheAge: 'NonCommunique',
          },
        ],
      },
    },
  ]

  test.each(cases)('$description', ({ beneficiaires, expected }) => {
    const result = createParticipantsAnonymesForBeneficiaires(beneficiaires)
    expect(result).toEqual(expected)
  })
})
