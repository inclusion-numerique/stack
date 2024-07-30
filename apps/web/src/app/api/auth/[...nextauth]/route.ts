import NextAuth, { type NextAuthOptions } from 'next-auth'
import { nextAuthAdapter } from '@app/web/auth/nextAuthAdapter'
import { InclusionConnectProvider } from '@app/web/auth/InclusionConnectProvider'
import { registerLastLogin } from '@app/web/security/registerLastLogin'
import * as Sentry from '@sentry/nextjs'
import { isFirewallUserAgent } from '@app/web/app/api/auth/[...nextauth]/isFirewallUserAgent'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return NextAuth(request, res, authOptions)
}

export { handler as GET, handler as POST }
