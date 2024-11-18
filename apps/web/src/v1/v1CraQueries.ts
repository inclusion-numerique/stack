import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'
import type { GetCrasConseillerNumeriqueV1Input } from '@app/web/v1/GetCrasConseillerNumeriqueV1Input'

const getConseillerCoordonnesIds = async ({
  coordinateurV1Id,
}: GetCrasConseillerNumeriqueV1Input) => {
  if (!coordinateurV1Id) {
    return null
  }
  // Coordinateur gets all V1 stats from his conseillers coordonés
  const found = await fetchConseillerNumeriqueV1Data({
    v1ConseillerId: coordinateurV1Id,
  })
  if (!found) {
    // Coordinateur does not exist in v1
    return null
  }

  const conseillersCoordonnes = found.conseillersCoordonnes ?? []

  return conseillersCoordonnes.map(({ id }) => id)
}

const crasConseillerNumeriqueV1Where = ({
  input: {
    conseillerNumeriqueV1Id,
    accompagnementSince,
    accompagnementUntil,
    codeCommune,
  },
  conseillerCoordonnesIds,
}: {
  input: GetCrasConseillerNumeriqueV1Input
  conseillerCoordonnesIds: string[] | null
}) =>
  ({
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
  }) satisfies Prisma.CraConseillerNumeriqueV1WhereInput

export const getCrasConseillerNumeriqueV1 = async (
  input: GetCrasConseillerNumeriqueV1Input,
) => {
  const { coordinateurV1Id } = input

  const result = await prismaClient.craConseillerNumeriqueV1.findMany({
    where: crasConseillerNumeriqueV1Where({
      input,
      conseillerCoordonnesIds: await getConseillerCoordonnesIds({
        coordinateurV1Id,
      }),
    }),
    orderBy: {
      dateAccompagnement: 'asc',
    },
  })

  return result
}

export type CraConseillerNumeriqueV1Item = Awaited<
  ReturnType<typeof getCrasConseillerNumeriqueV1>
>[number]

export const countCrasConseillerNumeriqueV1 = async (
  input: GetCrasConseillerNumeriqueV1Input,
) => {
  const { coordinateurV1Id } = input

  return prismaClient.craConseillerNumeriqueV1.count({
    where: crasConseillerNumeriqueV1Where({
      input,
      conseillerCoordonnesIds: await getConseillerCoordonnesIds({
        coordinateurV1Id,
      }),
    }),
  })
}
