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

  it('gets conseiller coordonné matching email', async () => {
    const result = await findConseillerNumeriqueByEmail(
      'michele.ladik@grand-cognac.fr',
    )

    expect(result?.conseiller).toBeDefined()
    expect(result?.conseiller.estCoordinateur).toBeFalsy()
    expect(result?.miseEnRelation).toBeDefined()
    expect(result?.conseillersCoordonnes.length).toBe(0)
    expect(result?.permanences.length).toBeGreaterThan(0)
    expect(result?.conseiller.coordinateurs?.length).toBeGreaterThan(0)
  })

  it('gets conseiller coordinateur matching mail', async () => {
    const result = await findConseillerNumeriqueByEmail(
      'fabien.lagarde@conseiller-numerique.fr',
    )

    expect(result?.conseiller).toBeDefined()
    expect(result?.conseiller.estCoordinateur).toBeTrue()
    expect(result?.miseEnRelation).toBeDefined()
    expect(result?.conseillersCoordonnes.length).toBeGreaterThan(0)
    expect(result?.permanences.length).toBeGreaterThan(0)
  })

  it('should find conseillers coordonnés by email', async () => {
    const result = await findConseillersCoordonnesByEmail(
      'fabien.lagarde@conseiller-numerique.fr',
    )

    expect(result.length).toBeGreaterThan(0)
  })
})
