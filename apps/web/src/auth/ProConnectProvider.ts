import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { proConnectProviderId } from '@app/web/auth/proConnect'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { OAuth2Config } from '@auth/core/providers'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import type { TokenEndpointHandler } from 'next-auth/providers'

const issuer = `https://${PublicWebAppConfig.ProConnect.hostname}`

export type ProConnectProfile = {
  sub: string
  email: string
  given_name: string
  usual_name: string
  aud: string
  exp: number
  iat: number
  iss: string
}

/**
 * https://github.com/numerique-gouv/agentconnect-documentation/blob/main/doc_fs.md
 */

export const ProConnectProvider = () =>
  ({
    id: proConnectProviderId,
    name: 'ProConnect',
    type: 'oauth',
    // Allow an email user to login with Inclusion Connect
    allowDangerousEmailAccountLinking: true,
    clientId: PublicWebAppConfig.ProConnect.clientId,
    clientSecret: ServerWebAppConfig.ProConnect.clientSecret,
    issuer,
    authorization: {
      url: `${issuer}/api/v2/authorize`,
      params: {
        // https://github.com/numerique-gouv/agentconnect-documentation/blob/main/doc_fs/scope-claims.md#correspondance-entre-scope-et-claims-sur-agentconnect
        scope: 'openid given_name usual_name email',
        // 'openid given_name usual_name email uid siret siren organizational_unit belonging_population phone chorusdt',

        acr_values: 'eidas1',
      },
    },
    token: {
      request: async (context: {
        params: {
          code?: string
        }
      }) => {
        const body = {
          grant_type: 'authorization_code',
          client_id: PublicWebAppConfig.ProConnect.clientId,
          client_secret: ServerWebAppConfig.ProConnect.clientSecret,
          redirect_uri: getServerUrl('/api/auth/callback/proconnect'),
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
          url: `${issuer}/api/v2/token`,
        })

        return { tokens: r.data }
      },
    } satisfies TokenEndpointHandler,
    userinfo: {
      request: async ({
        tokens,
      }: {
        tokens: {
          access_token?: string
        }
      }) => {
        const r = await axios<string>({
          method: 'POST',
          url: `${issuer}/api/v2/userinfo`,
          headers: {
            Authorization: tokens.access_token
              ? `Bearer ${tokens.access_token}`
              : '',
          },
        })
        // User info returns a JWT token instead of a JSON object, we decode it
        return jwt.decode(r.data) as ProConnectProfile
      },
    },
    profile: ({ email, sub, given_name, usual_name }) => ({
      id: sub,
      name: `${given_name} ${usual_name}`.trim(),
      firstName: given_name,
      lastName: usual_name,
      email: email.toLowerCase(),
      provider: proConnectProviderId,
    }),
  }) satisfies OAuth2Config<ProConnectProfile>
