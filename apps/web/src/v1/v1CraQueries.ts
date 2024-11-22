import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'
import { CrasConseillerNumeriqueV1FilterOptions } from '@app/web/app/coop/(full-width-layout)/archives-v1/crasConseillerNumeriqueV1Queries'

export const getConseillerCoordonnesIds = async ({
  coordinateurV1Id,
  includeCoordinateur,
}: {
  coordinateurV1Id: string
  includeCoordinateur: boolean
}) => {
  // Coordinateur gets all V1 stats from his conseillers coordonés
  const found = await fetchConseillerNumeriqueV1Data({
    v1ConseillerId: coordinateurV1Id,
  })
  if (!found) {
    // Coordinateur does not exist in v1
    return []
  }

  const conseillersCoordonnes = found.conseillersCoordonnes ?? []

  const conseillersCoordonnesIds = conseillersCoordonnes.map(({ id }) => id)

  if (includeCoordinateur) {
    conseillersCoordonnesIds.push(coordinateurV1Id)
  }

  return conseillersCoordonnesIds
}

// Keep in sync with below crasConseillerNumeriqueV1WhereRawSql
export const crasConseillerNumeriqueV1Where = (
  input: CrasConseillerNumeriqueV1FilterOptions,
) =>
  ({
    v1ConseillerNumeriqueId:
      input.conseillerNumeriqueIds && input.conseillerNumeriqueIds.length > 0
        ? {
            in: input.conseillerNumeriqueIds,
          }
        : undefined,
    codeCommune: input.codeCommune ?? undefined,
  }) satisfies Prisma.CraConseillerNumeriqueV1WhereInput

// Keep in sync with above crasConseillerNumeriqueV1Where
export const crasConseillerNumeriqueV1WhereRawSql = (
  input: CrasConseillerNumeriqueV1FilterOptions,
) => {
  const conditions: string[] = []

  if (input.codeCommune) {
    conditions.push(`code_commune  = '${input.codeCommune}'`)
  }
  if (
    !!input.conseillerNumeriqueIds &&
    input.conseillerNumeriqueIds.length > 0
  ) {
    conditions.push(
      `id IN (${input.conseillerNumeriqueIds.map((id) => `'${id}'`).join(', ')})`,
    )
  }

  if (conditions.length === 0) {
    return Prisma.raw('1 = 1')
  }
  return Prisma.raw(conditions.join(' AND '))
}

export const getCrasConseillerNumeriqueV1 = async (
  input: CrasConseillerNumeriqueV1FilterOptions,
) => {
  const result = await prismaClient.craConseillerNumeriqueV1.findMany({
    where: crasConseillerNumeriqueV1Where(input),
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
  input: CrasConseillerNumeriqueV1FilterOptions,
) =>
  prismaClient.craConseillerNumeriqueV1.count({
    where: crasConseillerNumeriqueV1Where(input),
  })
