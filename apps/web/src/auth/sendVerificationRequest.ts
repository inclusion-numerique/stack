import { SendVerificationRequestParams } from 'next-auth/providers'
import { createTransport } from 'nodemailer'
import { compileMjml } from '@app/emails/mjml'
import { emailSignin } from '@app/emails/templates/emailSignin'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

const debugMagicLink = true

export const sendVerificationRequest = async ({
  url,
  provider,
  identifier,
}: SendVerificationRequestParams) => {
  // For quicker dev UX, display url in console in dev environment
  if (debugMagicLink) {
    // eslint-disable-next-line no-console
    console.log(`[AUTH] Magic link for ${identifier}: ${url}`)
  }

  const transport = createTransport(provider.server as string)
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Connexion à ${PublicWebAppConfig.projectTitle}`,
    text: emailSignin.text({ url }),
    html: compileMjml(emailSignin.mjml({ url })),
  })
  const failed = [...result.rejected].filter(Boolean)
  if (failed.length > 0) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
  }
}
