import { compileMjml } from '@app/emails/mjml'
import { declineInvitation } from '@app/emails/templates/declineInvitation'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { emailTransport } from '@app/web/server/email/emailTransport'
import { throwOnSendMailFailure } from '@app/web/server/email/throwOnSendMailFailure'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

export const sendDeclineInvitation = async ({
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

    subject: `${mediateur} a refusé l‘invitation à rejoindre votre équipe`,
    text: declineInvitation.text({ mediateur: mediateur || '' }),
    html: compileMjml(declineInvitation.mjml({ mediateur: mediateur || '' })),
  })

  throwOnSendMailFailure(result)
}
