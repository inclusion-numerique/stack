import KeycloakProvider, { KeycloakProfile } from 'next-auth/providers/keycloak'
import { TokenSet } from 'next-auth'
import axios from 'axios'
import { monCompteProConnectProviderId } from '@app/web/auth/monCompteProConnect'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

export type MonCompteProProfile = {
  sub: string
  email: string
  email_verified: boolean
  family_name: string
  given_name: string
  updated_at: string
  job: string
}

export const MonCompteProProvider = () =>
  KeycloakProvider({
    allowDangerousEmailAccountLinking: true,
    id: monCompteProConnectProviderId,
    name: 'Moncomptepro Connect',
    clientId: PublicWebAppConfig.MonComptePro.clientId,
    clientSecret: ServerWebAppConfig.MonComptePro.clientSecret,
    authorization: { params: { scope: 'openid email profile' } },
    // KeycloakProvider adds wellknown open id config path
    issuer: PublicWebAppConfig.MonComptePro.issuer,
    userinfo: `${PublicWebAppConfig.MonComptePro.issuer}/oauth/userinfo`,
    profile: async (profile: KeycloakProfile, tokens: TokenSet) =>
      axios
        .get<MonCompteProProfile>(
          `${PublicWebAppConfig.MonComptePro.issuer}/oauth/userinfo`,
          {
            headers: { Authorization: `Bearer ${tokens.access_token || ''}` },
          },
        )
        .then((response) => response.data)
        .then((_profile) => ({
          id: _profile.sub,
          name: `${_profile.given_name} ${_profile.family_name}`,
          firstName: _profile.given_name,
          lastName: _profile.family_name,
          email: _profile.email,
          provider: monCompteProConnectProviderId,
        })),
  })
