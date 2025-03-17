import { takeAndSkipFromPage } from '@app/web/data-table/takeAndSkipFromPage'
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  toNumberOr,
} from '@app/web/data-table/toNumberOr'
import { toQueryParts } from '@app/web/data-table/toQueryParts'
import { prismaClient } from '@app/web/prismaClient'
import { Prisma } from '@prisma/client'

type SearchUserOptions = {
  searchParams?: { recherche?: string; page?: string; lignes?: string }
}

export const searchUser = async (options: SearchUserOptions) => {
  const searchParams = options.searchParams ?? {}

  const { take, skip } = takeAndSkipFromPage({
    page: toNumberOr(searchParams?.page)(DEFAULT_PAGE),
    pageSize: toNumberOr(searchParams?.lignes)(DEFAULT_PAGE_SIZE),
  })

  const where = {
    deleted: null,
    AND: toQueryParts(searchParams).map((part) => ({
      OR: [
        { name: { contains: part, mode: 'insensitive' } },
        { email: { contains: part, mode: 'insensitive' } },
      ],
    })),
  } satisfies Prisma.UserWhereInput

  const users = await prismaClient.user.findMany({
    where,
    take,
    skip,
    select: { id: true, name: true, email: true },
    orderBy: [{ name: 'asc' }],
  })

  const matchesCount = await prismaClient.user.count({ where })

  return {
    users,
    matchesCount,
    moreResults: Math.max(matchesCount - (take ?? 0), 0),
    totalPages: take ? Math.ceil(matchesCount / take) : 1,
  }
}

export type SearchUserResult = Awaited<ReturnType<typeof searchUser>>
