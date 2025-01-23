import {
  createBeneficiairesForParticipantsAnonymes,
  createCounterUuid,
} from '@app/web/beneficiaire/createBeneficiairesForParticipantsAnonymes'
import { participantsAnonymesDefault } from '@app/web/cra/participantsAnonymes'
import { v4 } from 'uuid'

describe('createBeneficiairesForParticipantsAnonymes', () => {
  describe('createCounterUuid', () => {
    const uuid = '75bb7e05-9dd8-417e-b4c0-5b30d24a6e58'

    const cases = [
      { index: 0, expected: '75bb7e05-9dd8-417e-b4c0-5b30d2400000' },
      { index: 1, expected: '75bb7e05-9dd8-417e-b4c0-5b30d2400001' },
      { index: 10, expected: '75bb7e05-9dd8-417e-b4c0-5b30d2400010' },
      { index: 100, expected: '75bb7e05-9dd8-417e-b4c0-5b30d2400100' },
      { index: 1090, expected: '75bb7e05-9dd8-417e-b4c0-5b30d2401090' },
      { index: 10_000, expected: '75bb7e05-9dd8-417e-b4c0-5b30d2410000' },
    ]

    // create test with index in the test case label
    test.each(cases)(
      'should generate a uuid with the right length and counter at the end for index $index',
      ({ index, expected }) => {
        expect(createCounterUuid(uuid, index)).toEqual(expected)
      },
    )
  })

  it('should work for 0 beneficiaires', () => {
    expect(
      createBeneficiairesForParticipantsAnonymes({
        participantsAnonymes: participantsAnonymesDefault,
        mediateurId: 'mediateur-id',
      }),
    ).toEqual([])
  })

  it('should work for 1 beneficiaire', () => {
    const participants = {
      ...participantsAnonymesDefault,
      total: 1,
      trancheAgeQuaranteCinquanteNeuf: 1,
      genreNonCommunique: 1,
    }

    const id = v4()
    expect(
      createBeneficiairesForParticipantsAnonymes({
        participantsAnonymes: participants,
        mediateurId: 'mediateur-id',
        rootUuid: id,
      }),
    ).toEqual([
      {
        id: createCounterUuid(id, 0),
        mediateurId: 'mediateur-id',
        dejaAccompagne: false,
        anonyme: true,
        attributionsAleatoires: true,
        trancheAge: 'QuaranteCinquanteNeuf',
        statutSocial: 'NonCommunique',
        genre: 'NonCommunique',
      },
    ])
  })

  it('should work for multiple beneficiaires', () => {
    const participants = {
      ...participantsAnonymesDefault,
      total: 2,
      trancheAgeQuaranteCinquanteNeuf: 1,
      genreFeminin: 1,
    }

    const id = v4()
    expect(
      createBeneficiairesForParticipantsAnonymes({
        participantsAnonymes: participants,
        mediateurId: 'mediateur-id',
        rootUuid: id,
      }),
    ).toEqual([
      {
        id: createCounterUuid(id, 0),
        mediateurId: 'mediateur-id',
        dejaAccompagne: false,
        anonyme: true,
        attributionsAleatoires: true,
        trancheAge: 'QuaranteCinquanteNeuf',
        statutSocial: 'NonCommunique',
        genre: 'Feminin',
      },
      {
        id: createCounterUuid(id, 1),
        mediateurId: 'mediateur-id',
        dejaAccompagne: false,
        anonyme: true,
        attributionsAleatoires: true,
        trancheAge: 'NonCommunique',
        statutSocial: 'NonCommunique',
        genre: 'NonCommunique',
      },
    ])
  })
})
