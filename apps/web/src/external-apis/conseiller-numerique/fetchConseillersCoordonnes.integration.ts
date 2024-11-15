import {
  fetchConseillersCoordonnes,
  findConseillersNumeriquesContractInfoByEmails,
} from '@app/web/external-apis/conseiller-numerique/fetchConseillersCoordonnes'
import { closeMongoClient } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'

describe('fetchConseillersCoordonnes', () => {
  afterAll(async () => {
    await closeMongoClient()
  })

  it('should find conseillers coordonnés by coordinateur id', async () => {
    const result = await fetchConseillersCoordonnes({
      coordinateurV1Id: '657973467a10c4da5b9ecead',
    })

    expect(result.length).toBeGreaterThan(0)
  })

  it('should find find conseillers numériques contract info by emails', async () => {
    const result = await findConseillersNumeriquesContractInfoByEmails([
      'hugo.lacombe@christianefaure.fr',
    ])

    expect(result.length).toBeGreaterThan(0)
  })

  it('should return empty array when no conseiller coordonné found', async () => {
    const result = await fetchConseillersCoordonnes({
      coordinateurV1Id: '60461fff871498b5cec20bfd',
    })

    expect(result).toEqual([])
  })
})
