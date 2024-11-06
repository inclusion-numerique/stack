import { closeMongoClient } from './conseillerNumeriqueMongoClient'
import {
  findConseillerNumeriqueByEmail,
  findConseillersCoordonnesByEmail,
} from './findConseillerNumeriqueByEmail'

describe('find conseiller numérique by email', () => {
  afterAll(async () => {
    await closeMongoClient()
  })

  it('gets null when there is no conseiller matching mail', async () => {
    const conseiller = await findConseillerNumeriqueByEmail('test@test.com')

    expect(conseiller).toBeNull()
  })

  it('gets conseiller by professional email', async () => {
    const result = await findConseillerNumeriqueByEmail(
      'michele.ladik@grand-cognac.fr',
    )

    expect(result?.conseiller).toBeDefined()
    expect(result?.conseiller.estCoordinateur).toBeFalsy()
    expect(result?.miseEnRelationActive).toBeDefined()
    expect(result?.conseillersCoordonnes.length).toBe(0)
    expect(result?.permanences.length).toBeGreaterThan(0)
    expect(result?.conseiller.coordinateurs?.length).toBeGreaterThan(0)
  })

  it.skip('should not get conseiller by personal email', async () => {
    const result = await findConseillerNumeriqueByEmail(
      'xxxx@gmail.com', // no personal email in codebase
    )
    expect(result).toBeNull()
  })

  it('should not get conseiller by legacy @conseiller-numerique email', async () => {
    const result = await findConseillerNumeriqueByEmail(
      'michele.ladik@conseiller-numerique.fr',
    )
    expect(result).toBeNull()
  })

  it('gets conseiller coordinateur matching mail', async () => {
    const result = await findConseillerNumeriqueByEmail(
      'fabien.lagarde@numeriquesudcharente.com',
    )

    expect(result?.conseiller).toBeDefined()
    expect(result?.conseiller.estCoordinateur).toBeTrue()
    expect(result?.miseEnRelationActive).toBeDefined()
    expect(result?.conseillersCoordonnes.length).toBeGreaterThan(0)
    expect(result?.permanences.length).toBeGreaterThan(0)
  })

  it('should find conseillers coordonnés by email', async () => {
    const result = await findConseillersCoordonnesByEmail(
      'fabien.lagarde@numeriquesudcharente.com',
    )

    expect(result.length).toBeGreaterThan(0)
  })
})
