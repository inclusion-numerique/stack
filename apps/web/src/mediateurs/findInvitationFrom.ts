import { prismaClient } from '../prismaClient'

export const findInvitationFrom =
  (coordinateurId: string) => async (email: string) =>
    prismaClient.invitationEquipe.findFirst({
      where: {
        email,
        coordinateurId,
      },
      select: {
        email: true,
        coordinateurId: true,
        coordinateur: {
          select: { user: { select: { email: true } } },
        },
        mediateurInvite: {
          select: { id: true, user: { select: { email: true } } },
        },
      },
    })
