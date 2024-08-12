import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { activiteCrasCounts } from '@app/web/cra/activiteQueries'

type SearchActiviteOptions = {
  take: number
  mediateurId?: string
  orderBy?: Prisma.ActiviteMediateurOrderByWithRelationInput[]
  skip?: number
  query?: string
}

export const searchActiviteSelect = {
  id: true,
  mediateurId: true,
  craIndividuel: true,
  craDemarcheAdministrative: true,
  craCollectif: true,
} satisfies Prisma.ActiviteMediateurSelect

// List activites not anonymous
export const activitesListWhere = ({ mediateurId }: { mediateurId?: string }) =>
  ({
    mediateurId,
    OR: [
      {
        craIndividuel: {
          suppression: null,
        },
      },
      {
        craCollectif: {
          suppression: null,
        },
      },
      {
        craDemarcheAdministrative: {
          suppression: null,
        },
      },
    ],
  }) satisfies Prisma.ActiviteMediateurWhereInput

export const searchActivite = async (options: SearchActiviteOptions) => {
  const activitesSearchLimit = options?.take || 50
  const queryParts = options?.query?.split(' ') ?? []

  const matchesWhere = {
    ...activitesListWhere({
      mediateurId: options?.mediateurId,
    }),
    AND: queryParts.map((part) => ({
      OR: [
        {
          prenom: {
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
          commune: {
            contains: part,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: part,
            mode: 'insensitive',
          },
        },
        {
          communeCodePostal: {
            contains: part,
            mode: 'insensitive',
          },
        },
      ],
    })),
  } satisfies Prisma.ActiviteMediateurWhereInput

  const activitesRaw = await prismaClient.activiteMediateur.findMany({
    where: matchesWhere,
    take: activitesSearchLimit,
    skip: options?.skip,
    select: searchActiviteSelect,
    orderBy: [
      ...(options?.orderBy ?? []),
      {
        nom: 'asc',
      },
      {
        prenom: 'asc',
      },
    ],
  })

  const matchesCount = await prismaClient.activiteMediateur.count({
    where: matchesWhere,
  })

  const totalPages = Math.ceil(matchesCount / activitesSearchLimit)

  const activites = activitesRaw.map((activite) => ({
    ...prismaActiviteToActiviteData(activite),
    ...activiteCrasCounts(activite),
  }))

  return {
    activites,
    matchesCount,
    moreResults: Math.max(matchesCount - activitesSearchLimit, 0),
    totalPages,
  }
}

export type SearchActiviteResult = Awaited<ReturnType<typeof searchActivite>>

export type SearchActiviteResultRow = SearchActiviteResult['activites'][number]
