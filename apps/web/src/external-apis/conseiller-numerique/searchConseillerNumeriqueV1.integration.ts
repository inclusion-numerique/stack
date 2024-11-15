import type { ConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Data'
import { findConseillerNumeriqueV1 } from '@app/web/external-apis/conseiller-numerique/searchConseillerNumeriqueV1'
import { closeMongoClient } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'

describe('search conseiller numérique V1', () => {
  afterAll(async () => {
    await closeMongoClient()
  })

  it('should find conseiller by mail when case si not the same', async () => {
    const conseiller: ConseillerNumeriqueV1Data =
      (await findConseillerNumeriqueV1({
        email: 'hugo.lacombe@christianefaure.fr',
      })) as unknown as ConseillerNumeriqueV1Data

    expect(conseiller).not.toBeNull()
  })
})
