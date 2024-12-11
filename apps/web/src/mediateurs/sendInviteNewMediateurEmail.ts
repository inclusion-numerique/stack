import { compileMjml } from '@app/emails/mjml'
import { inviteNewMediateur } from '@app/emails/templates/inviteNewMediateur'
import { SessionUser } from '@app/web/auth/sessionUser'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

export const sendInviteNewMediateurEmail = async ({
  url,
  email,
  from,
}: {
  url: string
  email: string
  from: SessionUser
}) => {
  const result = await emailTransport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,

    subject:
      'Invitation à rejoindre une équipe sur La Coop de la médiation numérique',
    text: inviteNewMediateur.text({ url, from: from.name || '' }),
    html: compileMjml(inviteNewMediateur.mjml({ url, from: from.name || '' })),
  })

  throwOnSendMailFailure(result)
}
