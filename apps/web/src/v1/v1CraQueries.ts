import { prismaClient } from '@app/web/prismaClient'
import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'
import type { GetCrasConseillerNumeriqueV1Input } from '@app/web/v1/GetCrasConseillerNumeriqueV1Input'

export const getCrasConseillerNumeriqueV1 = async ({
  codeCommune,
  coordinateurV1Id,
  conseillerNumeriqueV1Id,
  accompagnementSince,
  accompagnementUntil,
}: GetCrasConseillerNumeriqueV1Input) => {
  let conseillerCoordonnesIds: string[] | null = null

  // Coordinateur gets all V1 stats from his conseillers coordonés
  if (coordinateurV1Id) {
    const found = await fetchConseillerNumeriqueV1Data({
      v1ConseillerId: coordinateurV1Id,
    })
    if (!found) {
      // Coordinateur does not exist in v1
      return []
    }

    const conseillersCoordonnes = found.conseillersCoordonnes ?? []

    conseillerCoordonnesIds = conseillersCoordonnes.map(({ id }) => id)
  }

  const result = await prismaClient.craConseillerNumeriqueV1.findMany({
    where: {
      v1ConseillerNumeriqueId: conseillerCoordonnesIds
        ? {
            in: conseillerCoordonnesIds,
          }
        : conseillerNumeriqueV1Id,
      dateAccompagnement: {
        gte: accompagnementSince,
        lt: accompagnementUntil,
      },
      codeCommune,
    },
    orderBy: {
      dateAccompagnement: 'asc',
    },
  })

  return result
}

export type CraConseillerNumeriqueV1Item = Awaited<
  ReturnType<typeof getCrasConseillerNumeriqueV1>
>[number]
