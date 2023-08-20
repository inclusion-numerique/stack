import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'

export const userCurrentFormulaireParams = (userId: string) =>
  ({
    where: {
      participants: {
        some: {
          id: userId,
        },
      },
    },
    orderBy: {
      creation: 'desc',
    },
  } satisfies {
    where: Prisma.FormulaireGouvernanceWhereInput
    orderBy: Prisma.FormulaireGouvernanceOrderByWithRelationAndSearchRelevanceInput
  })

export const getFormulaireGouvernanceForForm = (
  params:
    | {
        userId: string
      }
    | {
        formulaireGouvernanceId: string
      },
) => {
  const { where, orderBy } =
    'userId' in params
      ? userCurrentFormulaireParams(params.userId)
      : {
          where: { id: params.formulaireGouvernanceId },
          orderBy: undefined,
        }

  return prismaClient.formulaireGouvernance.findFirst({
    where,
    orderBy,
    include: {
      participants: {
        select: {
          id: true,
          email: true,
        },
      },
      departement: true,
      commune: true,
      region: true,
      epci: true,
      communesParticipantes: {
        include: {
          commune: {
            select: {
              code: true,
              nom: true,
              codeDepartement: true,
              codeEpci: true,
              population: true,
              codesPostaux: {
                select: {
                  codePostal: {
                    select: {
                      code: true,
                    },
                  },
                },
              },
            },
          },
          contact: true,
        },
      },
      structuresParticipantes: {
        include: {
          contact: true,
        },
      },
      epcisParticipantes: {
        include: {
          epci: true,
          contact: true,
        },
      },
      contactPolitique: true,
      contactTechnique: true,
      contactStructure: true,
      _count: {
        select: {
          contacts: true,
          communesParticipantes: true,
          epcisParticipantes: true,
          structuresParticipantes: true,
        },
      },
    },
  })
}

export type GouvernanceFormulaireForForm = Exclude<
  Awaited<ReturnType<typeof getFormulaireGouvernanceForForm>>,
  null
>
