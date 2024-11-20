import { prismaClient } from '@app/web/prismaClient'

export const getLieuxActivites = async (mediateurId: string) =>
  prismaClient.mediateurEnActivite.findMany({
    where: {
      mediateurId,
      suppression: null,
    },
    select: {
      id: true,
      creation: true,
      modification: true,
      structure: {
        select: {
          id: true,
          nom: true,
          adresse: true,
          commune: true,
          codePostal: true,
          complementAdresse: true,
          siret: true,
          rna: true,
          typologies: true,
          _count: {
            select: {
              mediateursEnActivite: true,
            },
          },
        },
      },
    },
  })
