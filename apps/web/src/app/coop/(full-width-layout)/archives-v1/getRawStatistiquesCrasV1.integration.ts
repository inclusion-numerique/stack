import { closeMongoClient } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import { conseillerNumeriqueConseillerNumeriqueId } from '@app/fixtures/users/conseillerNumerique'
import { importCrasConseillerNumeriqueV1 } from '@app/web/external-apis/conseiller-numerique/importCrasConseillerNumeriqueV1'
import { getRawStatistiquesCrasV1 } from '@app/web/app/coop/(full-width-layout)/archives-v1/computeStatistiquesCrasV1'

describe('getRawStatistiquesCrasV1', () => {
  beforeAll(async () => {
    await importCrasConseillerNumeriqueV1({
      conseillerNumeriqueId: conseillerNumeriqueConseillerNumeriqueId,
    })
  })

  afterAll(async () => {
    await closeMongoClient()
  })

  it('should return empty data for a empty dataset', async () => {
    const data = await getRawStatistiquesCrasV1({ conseillerNumeriqueIds: [] })

    expect(data).toEqual(null)
  })

  it('should return stats for a list of v1 cras', async () => {
    const data = await getRawStatistiquesCrasV1({
      conseillerNumeriqueIds: [conseillerNumeriqueConseillerNumeriqueId],
    })

    console.log('RESULT', data)

    expect(data).toEqual({})
  })
})
