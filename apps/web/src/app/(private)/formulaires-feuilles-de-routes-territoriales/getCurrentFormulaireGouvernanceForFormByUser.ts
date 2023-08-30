import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'

const getFormulaireGouvernanceForForm = ({
  where,
  orderBy,
}: {
  where: Prisma.FormulaireGouvernanceWhereInput
  orderBy?: Prisma.FormulaireGouvernanceOrderByWithRelationAndSearchRelevanceInput
}) =>
  prismaClient.formulaireGouvernance.findFirst({
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
      departementsParticipants: {
        include: {
          departement: true,
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

export type GouvernanceFormulaireForForm = Exclude<
  Awaited<ReturnType<typeof getCurrentFormulaireGouvernanceForFormByUser>>,
  null
>

export const userCurrentFormulaireParams = (userId: string) =>
  ({
    where: {
      participants: {
        some: {
          id: userId,
        },
      },
      annulation: null,
    },
    orderBy: {
      creation: 'desc',
    },
  } satisfies {
    where: Prisma.FormulaireGouvernanceWhereInput
    orderBy: Prisma.FormulaireGouvernanceOrderByWithRelationAndSearchRelevanceInput
  })

export const getCurrentFormulaireGouvernanceForFormByUser = (userId: string) =>
  getFormulaireGouvernanceForForm(userCurrentFormulaireParams(userId))

export const getFormulaireGouvernanceForFormById = (
  formulaireGouvernanceId: string,
) =>
  getFormulaireGouvernanceForForm({
    where: { id: formulaireGouvernanceId },
  })
