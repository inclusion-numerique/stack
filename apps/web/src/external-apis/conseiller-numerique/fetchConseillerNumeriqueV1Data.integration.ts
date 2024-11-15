import { closeMongoClient } from './conseillerNumeriqueMongoClient'
import { fetchConseillerNumeriqueV1Data } from './fetchConseillerNumeriqueV1Data'

describe('fetchConseillerNumeriqueV1Data', () => {
  afterAll(async () => {
    await closeMongoClient()
  })

  it('gets null when there is no conseiller matching mail', async () => {
    const conseiller = await fetchConseillerNumeriqueV1Data({
      email: 'test@test.com',
    })

    expect(conseiller).toBeNull()
  })

  it('gets null for invalid id', async () => {
    const conseiller = await fetchConseillerNumeriqueV1Data({
      v1ConseillerId: 'invalid-id',
    })

    expect(conseiller).toBeNull()
  })

  it('gets conseiller by id', async () => {
    const result = await fetchConseillerNumeriqueV1Data({
      v1ConseillerId: '60462028871498b5cec210fb',
    })

    expect(result?.conseiller).toBeDefined()
    expect(result?.conseiller.estCoordinateur).toBeFalsy()
    expect(result?.miseEnRelationActive).toBeDefined()
    expect(result?.conseillersCoordonnes).toBeNull()
    expect(result?.permanences.length).toBeGreaterThan(0)
    expect(result?.conseiller.coordinateurs?.length).toBeGreaterThan(0)
  })

  it('gets conseiller by professional email', async () => {
    const result = await fetchConseillerNumeriqueV1Data({
      email: 'michele.ladik@grand-cognac.fr',
    })

    expect(result?.conseiller).toBeDefined()
    expect(result?.conseiller.estCoordinateur).toBeFalsy()
    expect(result?.miseEnRelationActive).toBeDefined()
    expect(result?.conseillersCoordonnes).toBeNull()
    expect(result?.permanences.length).toBeGreaterThan(0)
    expect(result?.conseiller.coordinateurs?.length).toBeGreaterThan(0)
  })

  it.skip('should not get conseiller by personal email', async () => {
    const result = await fetchConseillerNumeriqueV1Data({
      email: 'xxxx@gmail.com',
    })
    expect(result).toBeNull()
  })

  it('should get conseiller by mail when case si not the same', async () => {
    const result = await fetchConseillerNumeriqueV1Data({
      email: 'hugo.lacombe@christianefaure.fr',
    })
    expect(result).not.toBeNull()
  })

  it('should not get conseiller by legacy @conseiller-numerique email', async () => {
    const result = await fetchConseillerNumeriqueV1Data({
      email: 'michele.ladik@conseiller-numerique.fr',
    })
    expect(result).toBeNull()
  })

  it('gets conseiller coordinateur matching mail', async () => {
    const result = await fetchConseillerNumeriqueV1Data({
      email: 'fabien.lagarde@numeriquesudcharente.com',
    })

    expect(result?.conseiller).toBeDefined()
    expect(result?.conseiller.estCoordinateur).toBeTrue()
    expect(result?.miseEnRelationActive).toBeDefined()
    expect(result?.conseillersCoordonnes?.length).toBeGreaterThan(0)
    expect(result?.permanences.length).toBeGreaterThan(0)
  })
})
