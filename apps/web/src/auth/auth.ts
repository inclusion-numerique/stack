import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { ProConnectProvider } from '@app/web/auth/ProConnectProvider'
import { authenticationViaProconnect } from '@app/web/auth/authenticationProvider'
import { nextAuthAdapter } from '@app/web/auth/nextAuthAdapter'
import { sendVerificationRequest } from '@app/web/auth/sendVerificationRequest'
import { SessionUser } from '@app/web/auth/sessionUser'
import { registerLastLogin } from '@app/web/security/registerLastLogin'
import * as Sentry from '@sentry/nextjs'
import type { AuthOptions } from 'next-auth'
import Email from 'next-auth/providers/email'
import { isDefinedAndNotNull } from '../utils/isDefinedAndNotNull'
import { authenticationViaEmailMagicLink } from './authenticationProvider'

export const nextAuthOptions = {
  adapter: nextAuthAdapter,
  pages: {
    signIn: '/connexion',
    signOut: '/deconnexion',
    error: '/connexion/erreur',
    verifyRequest: '/connexion/verification',
    // This would be the first page the user sees after signing up
    // newUser: '/bienvenue',
  },
  providers: [
    authenticationViaProconnect ? ProConnectProvider() : null,
    authenticationViaEmailMagicLink
      ? Email({
          ...ServerWebAppConfig.Email,
          sendVerificationRequest,
        })
      : null,
  ].filter(isDefinedAndNotNull),
  callbacks: {
    signIn(params) {
      // For email signin verification request, we should do nothing
      // and continue with the signin flow
      if (params.email?.verificationRequest) {
        return true
      }

      // For an email signin, we don't have a "profile" object
      if (params.account?.provider === 'email' && params.user.id) {
        registerLastLogin({ userId: params.user.id }).catch((error) => {
          Sentry.captureException(error)
        })
        return true
      }

      // The rest of this function will execute for ProConnect flow

      const { user } = params as unknown as {
        user: SessionUser
        profile: {
          given_name: string
          usual_name: string
          phone_number: string | null
        }
      }

      registerLastLogin({ userId: user.id }).catch((error) => {
        Sentry.captureException(error)
      })
      return true
    },
    session: ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
} satisfies AuthOptions
