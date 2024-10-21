import { getMongoClient } from './conseillerNumeriqueMongoClient'
import { Conseiller } from './conseillersProjection'
import { getConseillersNumeriques } from './getConseillersNumeriques'

const isCoordinateur = ({ estCoordinateur }: { estCoordinateur: boolean }) =>
  estCoordinateur

describe('get conseillers numériques', () => {
  afterAll(async () => {
    const mongoClient = await getMongoClient()
    await mongoClient.close()
  })

  test('with coordinateur role', async () => {
    const conseillersNumeriques: Conseiller[] = await getConseillersNumeriques({
      estCoordinateur: true,
    })

    expect(Array.isArray(conseillersNumeriques)).toBe(true)
    expect(conseillersNumeriques.length).toBeGreaterThan(0)
    // eslint-disable-next-line unicorn/no-array-callback-reference
    expect(conseillersNumeriques.every(isCoordinateur)).toBe(true)
  })

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('without coordinateur role', async () => {
    const conseillersNumeriques: Conseiller[] = await getConseillersNumeriques()

    expect(Array.isArray(conseillersNumeriques)).toBe(true)
    expect(conseillersNumeriques.length).toBeGreaterThan(0)
    // eslint-disable-next-line unicorn/no-array-callback-reference
    expect(conseillersNumeriques.every(isCoordinateur)).toBe(false)
  })
})
