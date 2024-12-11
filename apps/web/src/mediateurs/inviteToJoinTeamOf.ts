import { prismaClient } from '@app/web/prismaClient'
import { AuthenticatedCoordinateur } from '../auth/getAuthenticatedMediateur'
import { sendInviteMediateurEmail } from './sendInviteMediateurEmail'
import { sendInviteNewMediateurEmail } from './sendInviteNewMediateurEmail'

export const inviteToJoinTeamOf =
  (user: AuthenticatedCoordinateur) =>
  async (members: { email: string; mediateurId?: string }[]) => {
    const alreadyCoordonneSet = new Set(
      user.coordinateur.mediateursCoordonnes.map((item) => item.mediateurId),
    )

    const invitations = members
      .filter((member) => !alreadyCoordonneSet.has(member.mediateurId ?? ''))
      .map((member) => ({
        email: member.email,
        coordinateurId: user.coordinateur.id,
        acceptee: null,
        refusee: null,
        ...(member.mediateurId === member.email
          ? {}
          : { mediateurId: member.mediateurId }),
      }))

    await Promise.all(
      invitations.map(async (invitation) =>
        invitation.mediateurId == null
          ? sendInviteNewMediateurEmail({
              url: `https://example.com/invitation/${invitation.email}`,
              email: invitation.email,
              from: user,
            })
          : sendInviteMediateurEmail({
              url: `https://example.com/invitation/${invitation.email}`,
              email: invitation.email,
              from: user,
            }),
      ),
    )

    return Promise.all(
      invitations.map(async (invitation) =>
        prismaClient.invitationEquipe.upsert({
          where: {
            email_coordinateurId: {
              email: invitation.email,
              coordinateurId: invitation.coordinateurId,
            },
          },
          update: invitation,
          create: invitation,
        }),
      ),
    )
  }
