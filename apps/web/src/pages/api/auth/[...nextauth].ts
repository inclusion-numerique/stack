import axios from 'axios'
import NextAuth, { NextAuthOptions, TokenSet } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import KeycloakProvider, { KeycloakProfile } from 'next-auth/providers/keycloak'
import {
  monCompteProConnectProviderId,
  MonCompteProProfile,
} from '@app/web/auth/monCompteProConnect'
import { nextAuthAdapter } from '@app/web/auth/nextAuthAdapter'
import '@app/web/auth/nextAuthSetup'
import { sendVerificationRequest } from '@app/web/auth/sendVerificationRequest'
import { PublicWebAppConfig, ServerWebAppConfig } from '@app/web/webAppConfig'

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
      ...ServerWebAppConfig.Auth.Email,
      sendVerificationRequest,
    }),
    KeycloakProvider({
      allowDangerousEmailAccountLinking: true,
      id: monCompteProConnectProviderId,
      name: 'Moncomptepro Connect',
      clientId: PublicWebAppConfig.MonCompteProConnect.clientId,
      clientSecret: ServerWebAppConfig.MonCompteProConnect.clientSecret,
      authorization: {
        params: { scope: 'openid email profile organizations' },
      },
      // KeycloakProvider adds wellknown open id config path
      issuer: PublicWebAppConfig.MonCompteProConnect.issuer,
      userinfo: `${PublicWebAppConfig.MonCompteProConnect.issuer}/oauth/userinfo`,
      profile: async (profile: KeycloakProfile, tokens: TokenSet) =>
        axios
          .get<MonCompteProProfile>(
            `${PublicWebAppConfig.MonCompteProConnect.issuer}/oauth/userinfo`,
            {
              headers: { Authorization: `Bearer ${tokens.access_token || ''}` },
            },
          )
          .then((response) => response.data)
          .then((userData) => ({
            id: userData.sub,
            name: `${userData.given_name} ${userData.family_name}`,
            firstName: userData.given_name,
            lastName: userData.family_name,
            email: userData.email,
            organizations: userData.organizations,
            provider: monCompteProConnectProviderId,
          })),
    }),
  ],
  callbacks: {
    signIn({ account, user }) {
      const isAllowedToSignIn =
        // KeyCloak is a type of oauth
        account?.type === 'oauth' ||
        // If user exists and comes from prisma, we will have User model properties defined
        ('created' in user &&
          !!user.created &&
          'updated' in user &&
          !!user.updated)

      if (isAllowedToSignIn) {
        return true
      }
      // Return false to display a default error message
      // return false

      // Or you can return a URL to redirect to:
      return `/creer-un-compte?raison=connexion-sans-compte&email=${
        user?.email ?? ''
      }`
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
