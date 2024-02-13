import NextAuth, { NextAuthOptions } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { nextAuthAdapter } from '@app/web/auth/nextAuthAdapter'
import '@app/web/auth/nextAuthSetup'
import { sendVerificationRequest } from '@app/web/auth/sendVerificationRequest'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { MonCompteProProvider } from '@app/web/auth/MonCompteProProvider'

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
  providers: [
    EmailProvider({
      ...ServerWebAppConfig.Email,
      sendVerificationRequest,
    }),
    MonCompteProProvider(),
  ],
  callbacks: {
    signIn({ account, user, email }) {
      const isAllowedToSignIn =
        // KeyCloak is a type of oauth
        account?.type === 'oauth' ||
        // If user exists and comes from prisma, we will have User model properties defined
        ('created' in user &&
          !!user.created &&
          'updated' in user &&
          !!user.updated)

      if (!isAllowedToSignIn) {
        // Return a URL to redirect to (can also return false to prevent redirect)
        return `/creer-un-compte?raison=connexion-sans-compte&email=${
          user?.email ?? ''
        }`
      }

      if (email?.verificationRequest) {
        // This is NOT the final signin (sending an email to verify)
        // Let the process continue
        return true
      }

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

export default NextAuth(authOptions)
