import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'

export const userCurrentFormulaireWhere = (userId: string) =>
  ({
    participants: {
      some: {
        id: userId,
      },
    },
  } satisfies Prisma.FormulaireGouvernanceWhereInput)

export const getFormulaireGouvernanceForForm = ({
  userId,
}: {
  userId: string
}) =>
  prismaClient.formulaireGouvernance.findFirst({
    where: userCurrentFormulaireWhere(userId),
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

export type GouvernanceFormulaireForForm = Exclude<
  Awaited<ReturnType<typeof getFormulaireGouvernanceForForm>>,
  null
>
