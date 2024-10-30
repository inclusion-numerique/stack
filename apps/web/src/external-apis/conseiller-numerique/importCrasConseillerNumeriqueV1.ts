import {
  deleteConseillerNumeriqueV1Cras,
  getConseillerNumeriqueCras,
  type GetConseillerNumeriqueCrasOptions,
} from '@app/web/external-apis/conseiller-numerique/conseillersNumeriquesCraQueries'
import { prismaClient } from '@app/web/prismaClient'
import { craConseillerNumeriqueToPrismaModel } from '@app/web/external-apis/conseiller-numerique/crasConseillerNumeriqueToPrismaModel' // no v1 cras before this date

// no v1 cras before this date
export const firstV1CrasMonth = new Date('2021-06-01')

export type ImportCrasConseillerNumeriqueV1Options =
  GetConseillerNumeriqueCrasOptions & {
    reset?: boolean
  }

export const importCrasConseillerNumeriqueV1 = async ({
  reset = false,
  ...getConseillerNumeriqueCrasOptions
}: ImportCrasConseillerNumeriqueV1Options) => {
  const importedAt = new Date()

  if (reset) {
    await deleteConseillerNumeriqueV1Cras(getConseillerNumeriqueCrasOptions)
  }

  const crasList = await getConseillerNumeriqueCras(
    getConseillerNumeriqueCrasOptions,
  )

  if (crasList.empty) {
    return {
      cras: [],
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
