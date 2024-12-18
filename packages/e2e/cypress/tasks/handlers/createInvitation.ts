import { prismaClient } from '@app/web/prismaClient'

export const createInvitation = async ({
  email,
  mediateurId,
  coordinateurId,
}: {
  email: string
  mediateurId?: string
  coordinateurId: string
}) =>
  prismaClient.invitationEquipe.create({
    data: {
      email,
      mediateurId,
      coordinateurId,
    },
  })
