import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import {
  BeneficiairesDataTable,
  type BeneficiairesDataTableSearchParams,
} from '@app/web/beneficiaire/BeneficiairesDataTable'
import { getDataTableOrderBy } from '@app/web/data-table/getDataTableOrderBy'
import { takeAndSkipFromPage } from '@app/web/data-table/takeAndSkipFromPage'
import { queryBeneficiairesForList } from '@app/web/beneficiaire/queryBeneficiairesForList'

type SearchBeneficiaireOptions = {
  mediateurId?: string
  searchParams?: BeneficiairesDataTableSearchParams
}

// List beneficiaires not anonymous
export const beneficiairesListWhere = ({
  mediateurId,
}: {
  mediateurId?: string
}) =>
  ({
    suppression: null,
    mediateurId,
    prenom: {
      not: null,
    },
    nom: {
      not: null,
    },
  }) satisfies Prisma.BeneficiaireWhereInput

export const searchBeneficiaire = async (
  options: SearchBeneficiaireOptions,
) => {
  const searchParams = options.searchParams ?? {}
  const { mediateurId } = options

  const orderBy = getDataTableOrderBy(searchParams, BeneficiairesDataTable)
  const pageSize = searchParams?.lignes
    ? Number.parseInt(searchParams.lignes, 10)
    : 10
  const page = searchParams?.page ? Number.parseInt(searchParams.page, 10) : 1

  const { take, skip } = takeAndSkipFromPage({
    page,
    pageSize,
  })

  const queryParts = searchParams.recherche?.split(' ') ?? []

  const matchesWhere = {
    ...beneficiairesListWhere({
      mediateurId,
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
  } satisfies Prisma.BeneficiaireWhereInput

  const beneficiaires = await queryBeneficiairesForList({
    where: matchesWhere,
    take,
    skip,
    orderBy,
  })

  const matchesCount = await prismaClient.beneficiaire.count({
    where: matchesWhere,
  })

  const totalPages = take ? Math.ceil(matchesCount / take) : 1

  return {
    beneficiaires,
    matchesCount,
    moreResults: Math.max(matchesCount - (take ?? 0), 0),
    totalPages,
  }
}

export type SearchBeneficiaireResult = Awaited<
  ReturnType<typeof searchBeneficiaire>
>
