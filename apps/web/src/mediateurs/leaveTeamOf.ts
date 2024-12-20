import { prismaClient } from '../prismaClient'

export const leaveTeamOf =
  ({ id: mediateurId }: { id: string }) =>
  async (coordinateurId: string) => {
    const mediateurCoordonne = await prismaClient.mediateurCoordonne.findFirst({
      where: { mediateurId, coordinateurId },
    })

    if (mediateurCoordonne == null) {
      return
    }

    await prismaClient.mediateurCoordonne.delete({
      where: { id: mediateurCoordonne.id },
    })
  }
