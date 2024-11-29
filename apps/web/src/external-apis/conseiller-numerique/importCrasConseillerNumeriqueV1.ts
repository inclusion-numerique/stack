import { getConseillerNumeriqueCrasFromMongo } from '@app/web/external-apis/conseiller-numerique/conseillersNumeriquesCraQueries'
import { prismaClient } from '@app/web/prismaClient'
import { craConseillerNumeriqueToPrismaModel } from '@app/web/external-apis/conseiller-numerique/crasConseillerNumeriqueToPrismaModel' // no v1 cras before this date

// no v1 cras before this date
export const firstV1CrasMonth = new Date('2021-06-01')

export type ImportCrasConseillerNumeriqueV1Options = {
  createdAtSince?: Date // included bound
  createdAtUntil?: Date // excluded bound
  conseillerNumeriqueId?: string
}

export const importCrasConseillerNumeriqueV1 = async ({
  ...getConseillerNumeriqueCrasOptions
}: ImportCrasConseillerNumeriqueV1Options) => {
  const importedAt = new Date()

  const crasList = await getConseillerNumeriqueCrasFromMongo(
    getConseillerNumeriqueCrasOptions,
  )

  if (crasList.empty) {
    return {
      cras: [],
      created: 0,
      empty: true,
    }
  }
  const { cras, empty } = crasList

  const created = await prismaClient.craConseillerNumeriqueV1.createMany({
    data: cras.map((item) =>
      craConseillerNumeriqueToPrismaModel({ item, importedAt }),
    ),
    skipDuplicates: true,
  })

  return {
    cras,
    created: created.count,
    empty,
  }
}
