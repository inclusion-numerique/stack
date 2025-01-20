import { getServerUrl } from '@app/web/utils/baseUrl'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { encodeSerializableState } from '@app/web/utils/encodeSerializableState'

export const rdvServicePublicOauthCallbackUrl = getServerUrl(
  '/api/rdv-service-public/auth/callback',
  { absolutePath: true },
)

export const rdvServicePublicOAuthConfig = {
  clientId: PublicWebAppConfig.RdvServicePublic.OAuth.clientId,
  redirectUri: rdvServicePublicOauthCallbackUrl,
  oauthHostname: PublicWebAppConfig.RdvServicePublic.OAuth.hostname,
  responseType: 'code',
  scope: 'write',
}

export const rdvServicePublicOAuthTokenEndpoint = `https://${rdvServicePublicOAuthConfig.oauthHostname}/oauth/token`

export const rdvOauthLinkAccountFlowUrl = ({
  redirectTo,
}: {
  redirectTo: string
}) => {
  // Configuration de l'OAuth
  const state = encodeSerializableState({ redirectTo })

  // Construction de l'URL
  return `https://${rdvServicePublicOAuthConfig.oauthHostname}/oauth/authorize?client_id=${
    rdvServicePublicOAuthConfig.clientId
  }&redirect_uri=${rdvServicePublicOAuthConfig.redirectUri}&response_type=${rdvServicePublicOAuthConfig.responseType}&scope=${rdvServicePublicOAuthConfig.scope}&state=${state}`
}
