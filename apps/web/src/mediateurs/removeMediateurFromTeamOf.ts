import { prismaClient } from '../prismaClient'

export const removeMediateurFromTeamOf =
  ({ id: coordinateurId }: { id: string }) =>
  async (mediateurId: string) => {
    const mediateurCoordonne = await prismaClient.mediateurCoordonne.findFirst({
      where: { mediateurId, coordinateurId },
    })

    if (mediateurCoordonne == null) {
      return
    }

    await prismaClient.mediateurCoordonne.update({
      where: { id: mediateurCoordonne.id },
      data: {
        suppression: new Date(),
      },
    })
  }
