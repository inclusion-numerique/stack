import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { takeAndSkipFromPage } from '@app/web/data-table/takeAndSkipFromPage'
import { toQueryParts } from '@app/web/data-table/toQueryParts'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  toNumberOr,
} from '@app/web/data-table/toNumberOr'

export type MonEquipeSearchParams = {
  lignes?: string
  page?: string
  recherche?: string
  tri?: 'alphabetique' | 'recent' | 'ancien'
}

const DEFAULT_TRI: Prisma.MediateurOrderByWithRelationInput = {
  user: { lastName: 'asc' },
}

const triMap: Record<
  NonNullable<MonEquipeSearchParams['tri']>,
  Prisma.MediateurOrderByWithRelationInput
> = {
  ancien: { creation: 'asc' },
  recent: { creation: 'desc' },
  alphabetique: DEFAULT_TRI,
}

export const searchMediateursCordonneBy =
  ({ id }: { id: string }) =>
  async (searchParams: MonEquipeSearchParams) => {
    const { take, skip } = takeAndSkipFromPage({
      page: toNumberOr(searchParams?.page)(DEFAULT_PAGE),
      pageSize: toNumberOr(searchParams?.lignes)(DEFAULT_PAGE_SIZE),
    })

    const matchesWhere = {
      coordinations: {
        some: { coordinateurId: id },
      },
      AND: toQueryParts(searchParams).map((part) => ({
        OR: [
          { user: { email: { contains: part, mode: 'insensitive' } } },
          { user: { firstName: { contains: part, mode: 'insensitive' } } },
          { user: { lastName: { contains: part, mode: 'insensitive' } } },
        ],
      })),
    } satisfies Prisma.MediateurWhereInput

    const mediateurs = await prismaClient.mediateur.findMany({
      where: matchesWhere,
      select: {
        id: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        conseillerNumerique: {
          select: { id: true },
        },
        activites: {
          select: { date: true },
          orderBy: { date: 'desc' },
          take: 1,
        },
      },
      take,
      skip,
      orderBy: searchParams.tri ? triMap[searchParams.tri] : DEFAULT_TRI,
    })

    const matchesCount = await prismaClient.mediateur.count({
      where: matchesWhere,
    })

    const totalPages = take ? Math.ceil(matchesCount / take) : 1

    return {
      mediateurs,
      matchesCount,
      totalPages,
    }
  }
