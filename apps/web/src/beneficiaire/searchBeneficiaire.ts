import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaBeneficiaireToBeneficiaireData } from '@app/web/beneficiaire/prismaBeneficiaireToBeneficiaireData'

type SearchBeneficiaireOptions = {
  limit: number
  orderBy?: Prisma.BeneficiaireOrderByWithRelationInput[]
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
  _count: {
    select: {
      crasDemarchesAdministratives: {
        where: { suppression: null },
      },
      crasIndividuels: {
        where: { suppression: null },
      },
      participationsAteliersCollectifs: {
        where: {
          craCollectif: {
            suppression: null,
          },
        },
      },
    },
  },
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

  const beneficiaires = beneficiairesRaw.map((beneficiaire) => ({
    ...prismaBeneficiaireToBeneficiaireData(beneficiaire),
    craDemarchesAdministrativesCount:
      beneficiaire._count.crasDemarchesAdministratives,
    craIndividuelsCount: beneficiaire._count.crasIndividuels,
    participationsAteliersCollectifsCount:
      beneficiaire._count.participationsAteliersCollectifs,
    totalCrasCount:
      beneficiaire._count.crasDemarchesAdministratives +
      beneficiaire._count.crasIndividuels +
      beneficiaire._count.participationsAteliersCollectifs,
  }))

  return {
    beneficiaires,
    matchesCount,
    moreResults: Math.max(matchesCount - beneficiairesSearchLimit, 0),
  }
}

export type SearchBeneficiaireResult = Awaited<
  ReturnType<typeof searchBeneficiaire>
>

export type SearchBeneficiaireResultRow =
  SearchBeneficiaireResult['beneficiaires'][number]
