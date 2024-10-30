import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { getDataTableOrderBy } from '@app/web/data-table/getDataTableOrderBy'
import { takeAndSkipFromPage } from '@app/web/data-table/takeAndSkipFromPage'
import {
  UtilisateursDataTable,
  UtilisateursDataTableSearchParams,
} from '@app/web/app/administration/utilisateurs/UtilisateursDataTable'
import { queryUtilisateursForList } from '@app/web/app/administration/utilisateurs/queryUtilisateursForList'

type SearchUtilisateurOptions = {
  mediateurId?: string
  searchParams?: UtilisateursDataTableSearchParams
}

// List utilisateurs
export const utilisateursListWhere = (
  // eslint-disable-next-line no-empty-pattern
  {
    // mediateurId,
  }: {
    // mediateurId?: string
  },
) => ({}) satisfies Prisma.UserWhereInput

const defaultResultSize = 1000

export const searchUtilisateur = async (options: SearchUtilisateurOptions) => {
  const searchParams = options.searchParams ?? {}
  const { mediateurId } = options

  const orderBy = getDataTableOrderBy(searchParams, UtilisateursDataTable)
  const pageSize = searchParams?.lignes
    ? Number.parseInt(searchParams.lignes, defaultResultSize)
    : defaultResultSize
  const page = searchParams?.page ? Number.parseInt(searchParams.page, 10) : 1

  const { take, skip } = takeAndSkipFromPage({
    page,
    pageSize,
  })

  const queryParts = searchParams.recherche?.split(' ') ?? []

  const matchesWhere = {
    ...utilisateursListWhere({
      mediateurId,
    }),
    AND: queryParts.map((part) => ({
      OR: [
        {
          firstName: {
            contains: part,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
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
      ],
    })),
  } satisfies Prisma.UserWhereInput

  const utilisateurs = await queryUtilisateursForList({
    where: matchesWhere,
    take,
    skip,
    orderBy,
  })

  const matchesCount = await prismaClient.user.count({
    where: matchesWhere,
  })

  const totalPages = take ? Math.ceil(matchesCount / take) : 1

  return {
    utilisateurs,
    matchesCount,
    moreResults: Math.max(matchesCount - (take ?? 0), 0),
    totalPages,
  }
}

export type SearchUtilisateurResult = Awaited<
  ReturnType<typeof searchUtilisateur>
>
