import { compileMjml } from '@app/emails/mjml'
import { inviteMediateur } from '@app/emails/templates/inviteMediateur'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { SessionUser } from '@app/web/auth/sessionUser'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'

export const sendInviteMediateurEmail = async ({
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
    text: inviteMediateur.text({ url, from: from.name || '' }),
    html: compileMjml(inviteMediateur.mjml({ url, from: from.name || '' })),
  })

  throwOnSendMailFailure(result)
}
