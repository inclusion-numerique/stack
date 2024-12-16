import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { sendAcceptInvitation } from './sendAcceptInvitation'

export const acceptInvitation = async (invitation: {
  coordinateurId: string
  email: string
  coordinateur: { user: { email: string } }
  mediateurInvite: { id: string; user: { email: string } } | null
}) => {
  await prismaClient.invitationEquipe.update({
    where: {
      email_coordinateurId: {
        email: invitation.email,
        coordinateurId: invitation.coordinateurId,
      },
    },
    data: {
      acceptee: new Date(),
    },
  })

  if (invitation.mediateurInvite != null) {
    await prismaClient.mediateurCoordonne.create({
      data: {
        id: v4(),
        mediateurId: invitation.mediateurInvite.id,
        coordinateurId: invitation.coordinateurId,
      },
    })
  }

  await sendAcceptInvitation({
    email: invitation.coordinateur.user.email,
    mediateur: invitation.mediateurInvite?.user.email ?? invitation.email,
  })
}
