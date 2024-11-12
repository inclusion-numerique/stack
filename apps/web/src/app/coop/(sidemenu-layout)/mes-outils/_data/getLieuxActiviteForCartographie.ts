import { prismaClient } from '@app/web/prismaClient'

export const getLieuxActiviteForCartographie = async (mediateurId: string) =>
  prismaClient.mediateurEnActivite.findMany({
    where: {
      mediateurId,
      suppression: null,
    },
    select: {
      creation: true,
      modification: true,
      structure: {
        select: { visiblePourCartographieNationale: true },
      },
    },
  })
