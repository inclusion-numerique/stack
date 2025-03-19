import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { isFirewallUserAgent } from '@app/web/app/api/auth/[...nextauth]/isFirewallUserAgent'
import { ProConnectProvider } from '@app/web/auth/ProConnectProvider'
import { authenticationViaProconnect } from '@app/web/auth/authenticationProvider'
import { nextAuthAdapter } from '@app/web/auth/nextAuthAdapter'
import { sendVerificationRequest } from '@app/web/auth/sendVerificationRequest'
import { SessionUser } from '@app/web/auth/sessionUser'
import { updateUserData } from '@app/web/auth/updateUserData'
import { registerLastLogin } from '@app/web/security/registerLastLogin'
import * as Sentry from '@sentry/nextjs'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import Email from 'next-auth/providers/email'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const isOutdatedUserData =
  (user: SessionUser) =>
  (profile: {
    given_name: string
    usual_name: string
    phone_number: string | null
  }) =>
    user.firstName !== profile.given_name ||
    user.lastName !== profile.usual_name ||
    user.phone !== profile.phone_number

const authOptions: NextAuthOptions = {
  // debug: process.env.NODE_ENV !== 'production',
  adapter: nextAuthAdapter,
  pages: {
    signIn: '/connexion',
    signOut: '/deconnexion',
    error: '/connexion/erreur',
    verifyRequest: '/connexion/verification',
    // This would be the first page the user sees after signing up
    // newUser: '/bienvenue',
  },
  providers: authenticationViaProconnect
    ? [ProConnectProvider()]
    : [
        Email({
          ...ServerWebAppConfig.Email,
          sendVerificationRequest,
        }),
      ],
  callbacks: {
    signIn(params) {
      const { user, profile } = params as unknown as {
        user: SessionUser
        profile: {
          given_name: string
          usual_name: string
          phone_number: string | null
        }
      }

      if (isOutdatedUserData(user)(profile)) {
        updateUserData({
          userId: user.id,
          firstName: profile.given_name,
          lastName: profile.usual_name,
          phone: profile.phone_number,
        }).catch((error) => {
          Sentry.captureException(error)
        })
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
}

const handler = (
  request: NextRequest,
  res: {
    params: { nextauth: string[] }
  },
) => {
  // https://next-auth.js.org/tutorials/avoid-corporate-link-checking-email-provider
  if (isFirewallUserAgent(request)) {
    return new Response('Bad Request', { status: 400 })
  }

  return NextAuth(request, res, authOptions)
}

export { handler as GET, handler as POST }
