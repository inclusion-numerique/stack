import { createVisitHash } from '@app/web/server/visitHash/createVisitHash'

describe('createVisitHash', () => {
  test('returns the same hash for the same seed', () => {
    const seed = 'testSeed'
    const hash1 = createVisitHash(seed)
    const hash2 = createVisitHash(seed)

    expect(hash1).toEqual(hash2)
  })

  test('returns different hashes for no seed', () => {
    const hash1 = createVisitHash()
    const hash2 = createVisitHash()

    expect(hash1).not.toEqual(hash2)
  })
})
