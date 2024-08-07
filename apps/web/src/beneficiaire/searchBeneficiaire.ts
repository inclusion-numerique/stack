import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { prismaBeneficiaireToBeneficiaireData } from '@app/web/beneficiaire/prismaBeneficiaireToBeneficiaireData'
import {
  beneficiaireCrasCounts,
  beneficiaireCrasCountSelect,
} from '@app/web/beneficiaire/beneficiaireQueries'

type SearchBeneficiaireOptions = {
  take: number
  mediateurId?: string
  orderBy?: Prisma.BeneficiaireOrderByWithRelationInput[]
  skip?: number
  query?: string
}

export const searchBeneficiaireSelect = {
  id: true,
  mediateurId: true,
  prenom: true,
  nom: true,
  anneeNaissance: true,
  trancheAge: true,
  commune: true,
  communeCodePostal: true,
  communeCodeInsee: true,
  creation: true,
  ...beneficiaireCrasCountSelect,
} satisfies Prisma.BeneficiaireSelect

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
  const beneficiairesSearchLimit = options?.take || 50
  const queryParts = options?.query?.split(' ') ?? []

  const matchesWhere = {
    ...beneficiairesListWhere({
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
  } satisfies Prisma.BeneficiaireWhereInput

  const beneficiairesRaw = await prismaClient.beneficiaire.findMany({
    where: matchesWhere,
    take: beneficiairesSearchLimit,
    skip: options?.skip,
    select: searchBeneficiaireSelect,
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

  const matchesCount = await prismaClient.beneficiaire.count({
    where: matchesWhere,
  })

  const totalPages = Math.ceil(matchesCount / beneficiairesSearchLimit)

  const beneficiaires = beneficiairesRaw.map((beneficiaire) => ({
    ...prismaBeneficiaireToBeneficiaireData(beneficiaire),
    ...beneficiaireCrasCounts(beneficiaire),
  }))

  return {
    beneficiaires,
    matchesCount,
    moreResults: Math.max(matchesCount - beneficiairesSearchLimit, 0),
    totalPages,
  }
}

export type SearchBeneficiaireResult = Awaited<
  ReturnType<typeof searchBeneficiaire>
>

export type SearchBeneficiaireResultRow =
  SearchBeneficiaireResult['beneficiaires'][number]
