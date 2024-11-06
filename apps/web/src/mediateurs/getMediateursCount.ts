import { prismaClient } from '@app/web/prismaClient'

export const getMediateursCount = async (mediateurCoordonnesIds: string[]) =>
  prismaClient.$transaction([
    prismaClient.mediateur.count({
      where: {
        id: { in: mediateurCoordonnesIds },
      },
    }),
    prismaClient.mediateur.count({
      where: {
        id: { in: mediateurCoordonnesIds },
        conseillerNumerique: { isNot: null },
      },
    }),
    prismaClient.mediateur.count({
      where: {
        id: { in: mediateurCoordonnesIds },
        conseillerNumerique: { is: null },
      },
    }),
  ])
