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
