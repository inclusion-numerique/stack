import { compileMjml } from '@app/emails/mjml'
import { acceptInvitation } from '@app/emails/templates/acceptInvitation'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

export const sendAcceptInvitation = async ({
  email,
  mediateur,
}: {
  email: string
  mediateur: string
}) => {
  const result = await emailTransport.sendMail({
    to: email,
    from: ServerWebAppConfig.Email.from,
    replyTo: PublicWebAppConfig.contactEmail,

    subject: `${mediateur} a accepté votre invitation à rejoindre votre équipe`,
    text: acceptInvitation.text({ mediateur: mediateur || '' }),
    html: compileMjml(acceptInvitation.mjml({ mediateur: mediateur || '' })),
  })

  throwOnSendMailFailure(result)
}
