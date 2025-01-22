import { prismaClient } from '@app/web/prismaClient'
import { encodeSerializableState } from '@app/web/utils/encodeSerializableState'
import type { CoordinateurUser } from '@app/web/auth/userTypeGuards'
import { sendInviteMediateurEmail } from './sendInviteMediateurEmail'
import { sendInviteNewMediateurEmail } from './sendInviteNewMediateurEmail'

const withInvitationFrom =
  (user: CoordinateurUser) =>
  ({ email }: { email: string }) => ({
    url: `/invitations/${encodeSerializableState({ email, coordinateurId: user.coordinateur.id })}`,
    email,
    from: user,
  })

export const inviteToJoinTeamOf =
  (user: CoordinateurUser) =>
  async (members: { email: string; mediateurId?: string }[]) => {
    const mediateurs = await prismaClient.invitationEquipe.findMany({
      where: {
        mediateurId: {
          in: user.coordinateur.mediateursCoordonnes.map(
            (item) => item.mediateurId,
          ),
        },
      },
      select: { email: true },
    })

    const invitations = members
      .filter((member) =>
        mediateurs.every(
          (mediateur) =>
            mediateur.email.toLowerCase() !== member.email.toLowerCase(),
        ),
      )
      .map((member) => ({
        email: member.email,
        coordinateurId: user.coordinateur.id,
        acceptee: null,
        refusee: null,
        ...(member.mediateurId === member.email
          ? {}
          : { mediateurId: member.mediateurId }),
      }))

    if (invitations.length === 0) {
      throw new Error('No new invitations to send')
    }

    await Promise.all(
      invitations.map(async (invitation) =>
        invitation.mediateurId == null
          ? sendInviteNewMediateurEmail(withInvitationFrom(user)(invitation))
          : sendInviteMediateurEmail(withInvitationFrom(user)(invitation)),
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
