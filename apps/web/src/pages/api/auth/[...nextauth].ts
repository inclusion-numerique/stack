import axios from 'axios'
import NextAuth, { NextAuthOptions, TokenSet } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import KeycloakProvider, { KeycloakProfile } from 'next-auth/providers/keycloak'
import Sentry from '@sentry/nextjs'
import type { User } from '@prisma/client'
import {
  monCompteProConnectProviderId,
  MonCompteProUserInfoOrganizationResponse,
} from '@app/web/auth/monCompteProConnect'
import { nextAuthAdapter } from '@app/web/auth/nextAuthAdapter'
import '@app/web/auth/nextAuthSetup'
import { sendVerificationRequest } from '@app/web/auth/sendVerificationRequest'
import { PublicWebAppConfig, ServerWebAppConfig } from '@app/web/webAppConfig'
import { sendGouvernanceWelcomeEmailIfNeeded } from '@app/web/gouvernance/sendGouvernanceWelcomeEmail'

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
      name: 'MonComptePro',
      clientId: PublicWebAppConfig.MonComptePro.clientId,
      clientSecret: ServerWebAppConfig.MonComptePro.clientSecret,
      authorization: {
        params: { scope: 'openid email profile organization' },
      },
      // KeycloakProvider adds wellknown open id config path
      issuer: PublicWebAppConfig.MonComptePro.issuer,
      userinfo: `${PublicWebAppConfig.MonComptePro.issuer}/oauth/userinfo`,
      profile: async (profile: KeycloakProfile, tokens: TokenSet) =>
        axios
          .get<MonCompteProUserInfoOrganizationResponse>(
            `${PublicWebAppConfig.MonComptePro.issuer}/oauth/userinfo`,
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
            organizations: [
              {
                id: userData.siret,
                is_collectivite_territoriale:
                  userData.is_collectivite_territoriale,
                is_external: userData.is_external,
                is_service_public: userData.is_service_public,
                label: userData.label,
                siret: userData.siret,
              },
            ],
            provider: monCompteProConnectProviderId,
          })),
    }),
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

      // This is the final signin (after email verification)
      sendGouvernanceWelcomeEmailIfNeeded({ user: user as User }).catch(
        (error) => {
          Sentry.captureException(error)
        },
      )

      // If this is the first signin after a gouvernance signup, we will send a "welcome" email

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
