import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { toTitleCase } from '@app/web/utils/toTitleCase'

type SearchStructureCartographieNationaleOptions = {
  limit?: number
  // Ids of structuresCartographieNationale to exclude from the search
  except?: string[]
}

export const searchStructureCartographieNationale = async (
  query: string,
  options?: SearchStructureCartographieNationaleOptions,
) => {
  const structuresSearchLimit = options?.limit || 50
  const queryParts = query.split(' ')

  const matchesWhere = {
    suppression: null,
    id: options?.except
      ? {
          notIn: options.except,
        }
      : undefined,
    AND: queryParts.map((part) => ({
      OR: [
        {
          pivot: {
            contains: part,
            mode: 'insensitive',
          },
        },
        {
          nom: {
            contains: part,
            mode: 'insensitive',
          },
        },
        {
          adresse: {
            contains: part,
            mode: 'insensitive',
          },
        },
        {
          commune: {
            contains: part,
            mode: 'insensitive',
          },
        },
      ],
    })),
  } satisfies Prisma.StructureCartographieNationaleWhereInput

  const structuresRaw =
    await prismaClient.structureCartographieNationale.findMany({
      where: matchesWhere,
      take: structuresSearchLimit,
      orderBy: {
        nom: 'asc',
      },
      include: {
        structure: {
          select: {
            id: true,
          },
        },
      },
    })

  const matchesCount = await prismaClient.structureCartographieNationale.count({
    where: matchesWhere,
  })

  const structures = structuresRaw.map(
    ({ nom, adresse, commune, ...rest }) => ({
      nom: toTitleCase(nom, { noUpper: true }),
      commune: toTitleCase(commune),
      adresse: toTitleCase(adresse, { noUpper: true }),
      ...rest,
    }),
  )

  return {
    structures,
    matchesCount,
    moreResults: Math.max(matchesCount - structuresSearchLimit, 0),
  }
}

export type SearchStructureCartographieNationaleResult = Awaited<
  ReturnType<typeof searchStructureCartographieNationale>
>

export type SearchStructureCartographieNationaleResultStructure =
  SearchStructureCartographieNationaleResult['structures'][number]
