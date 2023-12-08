import axios from 'axios'
import { OAuthConfig } from 'next-auth/providers'
import { inclusionConnectProviderId } from '@app/web/auth/inclusionConnect'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { getServerUrl } from '@app/web/utils/baseUrl'

const issuer = `https://${PublicWebAppConfig.InclusionConnect.hostname}`

export type InclusionConnectProfile = {
  sub: string
  email: string
  given_name: string
  family_name: string
}

console.log('LOCAL INCLUSION CONNECT DEBUG', {
  clientId: PublicWebAppConfig.InclusionConnect.clientId,
  clientSecret: ServerWebAppConfig.InclusionConnect.clientSecret,
  issuer,
})

export const InclusionConnectProvider = () =>
  ({
    id: inclusionConnectProviderId,
    name: 'Inclusion Connect',
    type: 'oauth',
    version: '2.0',
    // Allow an email user to login with Inclusion Connect
    allowDangerousEmailAccountLinking: true,
    clientId: PublicWebAppConfig.InclusionConnect.clientId,
    clientSecret: ServerWebAppConfig.InclusionConnect.clientSecret,
    issuer,
    authorization: {
      url: `${issuer}/auth/authorize`,
      params: {
        scope: 'openid profile email ',
      },
    },
    token: {
      request: async (context) => {
        const body = {
          grant_type: 'authorization_code',
          client_id: PublicWebAppConfig.InclusionConnect.clientId,
          client_secret: ServerWebAppConfig.InclusionConnect.clientSecret,
          redirect_uri: getServerUrl('/api/auth/callback/inclusion-connect'),
          code: context.params.code || 'undefined',
        }
        const data = new URLSearchParams(body).toString()
        const r = await axios<{
          access_token: string
          expires_in: number
          token_type: 'Bearer'
          scope: string
          refresh_token: string
          id_token: string
        }>({
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          data,
          url: `${issuer}/auth/token`,
        })
        return { tokens: r.data }
      },
    },
    userinfo: {
      request: async ({ tokens }) => {
        const r = await axios<{
          sub: string
          email: string
          given_name: string
          family_name: string
        }>({
          method: 'POST',
          url: `${issuer}/auth/userinfo`,
          headers: {
            Authorization: tokens.access_token
              ? `Bearer ${tokens.access_token}`
              : '',
          },
        })
        return r.data
      },
    },
    profile: (profile: {
      sub: string
      email: string
      given_name: string
      family_name: string
    }) => ({
      id: profile.sub,
      name: `${profile.given_name} ${profile.family_name}`,
      firstName: profile.given_name,
      lastName: profile.family_name,
      email: profile.email,
      provider: inclusionConnectProviderId,
    }),
  }) satisfies OAuthConfig<InclusionConnectProfile>
