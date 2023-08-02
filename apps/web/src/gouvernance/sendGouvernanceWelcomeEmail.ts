import type { User } from '@prisma/client'
import { createTransport } from 'nodemailer'
import { compileMjml } from '@app/emails/mjml'
import { gouvernanceWelcome } from '@app/emails/templates/gouvernanceWelcome'
import Sentry from '@sentry/nextjs'
import { ServerWebAppConfig } from '@app/web/webAppConfig'
import {
  GouvernancePersonaId,
  gouvernancePersonas,
} from '@app/web/app/(public)/gouvernance/gouvernancePersona'
import { prismaClient } from '@app/web/prismaClient'

export const sendGouvernanceWelcomeEmail = async ({
  user,
}: {
  user: User & { gouvernancePersona: GouvernancePersonaId }
}): Promise<true> => {
  const transport = createTransport(ServerWebAppConfig.Smtp.connectionString)
  const gouvernancePersona = gouvernancePersonas[user.gouvernancePersona]
  const result = await transport.sendMail({
    to: user.email,
    from: ServerWebAppConfig.Smtp.from,
    subject: `Inscription confirmée`,
    text: gouvernanceWelcome.text(),
    html: compileMjml(gouvernanceWelcome.mjml({ gouvernancePersona })),
  })
  const failed = [...result.rejected].filter(Boolean)
  if (failed.length > 0) {
    const errorMessage = `Gouvernance welcome email(s) (${failed.join(
      ', ',
    )}) could not be sent`
    console.error(errorMessage)
    Sentry.captureException(new Error(errorMessage))
    return true
  }

  await prismaClient.user.update({
    where: { id: user.id },
    data: { gouvernanceSignupEmailSent: new Date() },
  })

  return true
}

export const sendGouvernanceWelcomeEmailIfNeeded = ({ user }: { user: User }) =>
  !user.gouvernancePersona || user.gouvernanceSignupEmailSent
    ? Promise.resolve(false)
    : sendGouvernanceWelcomeEmail({
        user: user as User & { gouvernancePersona: GouvernancePersonaId },
      })
