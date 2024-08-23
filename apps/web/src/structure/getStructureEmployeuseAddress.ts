import { prismaClient } from '@app/web/prismaClient'

export const getStructureEmployeuseAddress = (userId: string) =>
  prismaClient.employeStructure.findFirst({
    where: {
      userId,
      suppression: null,
    },
    orderBy: {
      creation: 'desc',
    },
    select: {
      id: true,
      structure: {
        select: {
          commune: true,
          codePostal: true,
          codeInsee: true,
          adresse: true,
          complementAdresse: true,
        },
      },
    },
  })
