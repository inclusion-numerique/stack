import { compileMjml } from '@app/emails/mjml'
import { emailSignin } from '@app/emails/templates/emailSignin'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import type { EmailConfig } from 'next-auth/providers/email'
import { createTransport } from 'nodemailer'

const debugMagicLink = true

export const sendVerificationRequest: EmailConfig['sendVerificationRequest'] =
  async ({ url, provider, identifier }) => {
    // For quicker dev UX, display url in console in dev environment
    if (debugMagicLink) {
      // biome-ignore lint/suspicious/noConsole: needed for dev / debug
      console.log(`[AUTH] Magic link for ${identifier}: ${url}`)
    }

    const transport = createTransport(provider.server as string)
    const result = await transport.sendMail({
      to: identifier,
      from: provider.from,
      replyTo: PublicWebAppConfig.contactEmail,
      subject: `Connexion à ${PublicWebAppConfig.projectTitle}`,
      text: emailSignin.text({ url }),
      html: compileMjml(emailSignin.mjml({ url })),
    })
    const failed = [...result.rejected].filter(Boolean)
    if (failed.length > 0) {
      throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
    }
  }
