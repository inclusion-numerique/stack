import type { ConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Data'
import { closeMongoClient } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import { findConseillerNumeriqueV1 } from '@app/web/external-apis/conseiller-numerique/searchConseillerNumeriqueV1'
import { findCoordinateursFor } from './importFromConseillerNumerique.queries'

describe('import from conseiller numerique queries', () => {
  afterAll(async () => {
    await closeMongoClient()
  })

  it('should not find any coordinateur when conseiller is not coordonné', async () => {
    const conseiller: ConseillerNumeriqueV1Data =
      (await findConseillerNumeriqueV1({
        email: 'dorcasemma.batila.vdp@paris.fr',
      })) as unknown as ConseillerNumeriqueV1Data

    const coordinateurs = await findCoordinateursFor(conseiller)

    expect(coordinateurs).toHaveLength(0)
  })
})
