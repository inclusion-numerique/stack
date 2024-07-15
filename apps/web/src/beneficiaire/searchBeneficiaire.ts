import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaBeneficiaireToBeneficiaireData } from '@app/web/beneficiaire/prismaBeneficiaireToBeneficiaireData'

type SearchBeneficiaireOptions = {
  limit: number
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
} satisfies Prisma.BeneficiaireSelect

const getMediateurIdWhereFilter = (user: SessionUser) => {
  if (user.role === 'Admin') {
    return
  }

  if (user.mediateur) {
    return user.mediateur.id
  }

  throw new Error('User is not authorized to search for beneficiaires')
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
  query: string,
  user: SessionUser,
  options?: SearchBeneficiaireOptions,
) => {
  const beneficiairesSearchLimit = options?.limit || 50
  const queryParts = query.split(' ')

  if (user.role !== 'Admin' && !user.mediateur) {
    throw new Error('User is not authorized to search for beneficiaires')
  }

  const matchesWhere = {
    ...beneficiairesListWhere({ mediateurId: getMediateurIdWhereFilter(user) }),
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
    select: searchBeneficiaireSelect,
    orderBy: [
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

  const beneficiaires = beneficiairesRaw.map(
    prismaBeneficiaireToBeneficiaireData,
  )

  return {
    beneficiaires,
    matchesCount,
    moreResults: Math.max(matchesCount - beneficiairesSearchLimit, 0),
  }
}
