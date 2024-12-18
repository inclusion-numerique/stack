import { prismaClient } from '@app/web/prismaClient'
import { sendDeclineInvitation } from './sendDeclineInvitation'

export const declineInvitation = async (invitation: {
  coordinateurId: string
  email: string
  coordinateur: { user: { email: string } }
  mediateurInvite: { user: { email: string } } | null
}) => {
  await prismaClient.invitationEquipe.update({
    where: {
      email_coordinateurId: {
        email: invitation.email,
        coordinateurId: invitation.coordinateurId,
      },
    },
    data: {
      refusee: new Date(),
    },
  })

  await sendDeclineInvitation({
    email: invitation.coordinateur.user.email,
    mediateur: invitation.mediateurInvite?.user.email ?? invitation.email,
  })
}
