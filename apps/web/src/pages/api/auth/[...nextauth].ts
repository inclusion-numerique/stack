import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import * as Sentry from '@sentry/nextjs'
import { nextAuthAdapter } from '@app/web/auth/nextAuthAdapter'
import '@app/web/auth/nextAuthSetup'
import { InclusionConnectProvider } from '@app/web/auth/InclusionConnectProvider'
import { registerLastLogin } from '@app/web/security/registerLastLogin'
import { isFirewallUserAgent } from '@app/web/pages/api/auth/isFirewallUserAgent'

export const authOptions: NextAuthOptions = {
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
  providers: [InclusionConnectProvider()],
  callbacks: {
    signIn({ user }) {
      // Everyone is allowed to sign in

      registerLastLogin({ userId: user.id }).catch((error) => {
        Sentry.captureException(error)
      })
      return true
    },
    session: ({ session, user }) => {
      if (session.user) {
        // eslint-disable-next-line no-param-reassign
        session.user.id = user.id
      }
      return session
    },
  },
}

export default function auth(request: NextApiRequest, res: NextApiResponse) {
  // https://next-auth.js.org/tutorials/avoid-corporate-link-checking-email-provider
  if (isFirewallUserAgent(request)) {
    return res.status(400).end()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return NextAuth(request, res, authOptions)
}
