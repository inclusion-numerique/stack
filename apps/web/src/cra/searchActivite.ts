import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { prismaActiviteToActiviteModel } from '@app/web/cra/prismaActiviteToActiviteModel'
import {
  craCollectifForActiviteSelect,
  craDemarcheForActiviteSelect,
  craIndividuelForActiviteSelect,
} from '@app/web/cra/activitesQueries'

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
  craIndividuel: { select: craIndividuelForActiviteSelect },
  craDemarcheAdministrative: { select: craDemarcheForActiviteSelect },
  craCollectif: { select: craCollectifForActiviteSelect },
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

export const queryActivitesForList = async ({
  orderBy,
  skip,
  take,
  where,
}: {
  where: Prisma.ActiviteMediateurWhereInput
  orderBy: Prisma.ActiviteMediateurOrderByWithRelationInput[]
  skip?: number
  take?: number
}) =>
  prismaClient.activiteMediateur.findMany({
    where,
    take,
    skip,
    select: searchActiviteSelect,
    orderBy,
  })

export type ActiviteForListQueryResult = Awaited<
  ReturnType<typeof queryActivitesForList>
>[number]

export const searchActivite = async (options: SearchActiviteOptions) => {
  const activitesSearchLimit = options?.take || 50

  const matchesWhere = {
    ...activitesListWhere({
      mediateurId: options?.mediateurId,
    }),
  } satisfies Prisma.ActiviteMediateurWhereInput

  // TODO this will NOT work with prisma as we need to coalesce fields for ordering
  // TODO FIRST Do a raw sql query to fetch the ids of the activities
  // Then do a prisma query with the select to fetch correct date types, and "id IN..." clause

  const activitesQueryResult = await queryActivitesForList({
    where: matchesWhere,
    orderBy: [
      ...(options?.orderBy ?? []),
      {
        craDemarcheAdministrative: { date: 'desc' },
      },
      {
        craIndividuel: { date: 'desc' },
      },
      {
        craCollectif: { date: 'desc' },
      },
    ],
    skip: options?.skip,
    take: activitesSearchLimit,
  })

  const matchesCount = await prismaClient.activiteMediateur.count({
    where: matchesWhere,
  })

  const totalPages = Math.ceil(matchesCount / activitesSearchLimit)

  const activites = activitesQueryResult.map(prismaActiviteToActiviteModel)

  return {
    activites,
    matchesCount,
    moreResults: Math.max(matchesCount - activitesSearchLimit, 0),
    totalPages,
  }
}

export type SearchActiviteResult = Awaited<ReturnType<typeof searchActivite>>

export type SearchActiviteResultRow = SearchActiviteResult['activites'][number]
