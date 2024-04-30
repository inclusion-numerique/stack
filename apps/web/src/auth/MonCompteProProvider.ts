import KeycloakProvider, { KeycloakProfile } from 'next-auth/providers/keycloak'
import { TokenSet } from 'next-auth'
import axios from 'axios'
import { monCompteProConnectProviderId } from '@app/web/auth/monCompteProConnect'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

export type MonCompteProOrganization = {
  id: string
  is_collectivite_territoriale?: boolean
  is_external: boolean
  is_service_public: boolean
  // e.g. 'Commune de les martres sur morge - Mairie'
  label: string
  siret: string
}

export type MonCompteProProfile = {
  sub: string
  email: string
  email_verified: boolean
  family_name: string
  given_name: string
  updated_at: string
  job: string
  organizations: MonCompteProOrganization[]
}

// For scope "organization"
export type MonCompteProUserInfoOrganizationResponse = Exclude<
  MonCompteProProfile,
  'organizations'
> &
  Exclude<MonCompteProOrganization, 'id'>

// For scope "organizations"
export type MonCompteProUserInfoOrganizationsResponse = Exclude<
  MonCompteProProfile,
  'organizations'
> & {
  organizations: (Exclude<MonCompteProOrganization, 'id'> & { id: number })[]
}

export const MonCompteProProvider = () =>
  KeycloakProvider({
    allowDangerousEmailAccountLinking: true,
    id: monCompteProConnectProviderId,
    name: 'MonComptePro',
    clientId: PublicWebAppConfig.MonComptePro.clientId,
    clientSecret: ServerWebAppConfig.MonComptePro.clientSecret,
    authorization: { params: { scope: 'openid email profile organization' } },
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
  })
