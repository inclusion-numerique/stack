import { PublicWebAppConfig } from '@app/web/webAppConfig'

export const monCompteProConnectProviderId = 'moncomptepro'

export const getMonCompteProConnectLogoutUrl = (): string =>
  `${PublicWebAppConfig.MonCompteProConnect.issuer}/protocol/openid-connect/logout`

export const getMonCompteProConnectProfilePageUrl = (): string =>
  `${PublicWebAppConfig.MonCompteProConnect.issuer}`

export const getMonCompteProConnectProfileIssuerUrl = (): string =>
  `${PublicWebAppConfig.MonCompteProConnect.issuer}/.well-known/openid-configuration`

export const getMonCompteProConnectChangePasswordUrl = (): string =>
  `${PublicWebAppConfig.MonCompteProConnect.issuer}/login-actions/reset-credentials?client_id=monsuivisocial`
