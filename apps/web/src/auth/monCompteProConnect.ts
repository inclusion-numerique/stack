import { PublicWebAppConfig } from '@app/web/webAppConfig'

export const monCompteProConnectProviderId = 'moncomptepro'

export const getMonCompteProConnectLogoutUrl = (): string =>
  `${PublicWebAppConfig.MonComptePro.issuer}/protocol/openid-connect/logout`

export const getMonCompteProConnectProfilePageUrl = (): string =>
  `${PublicWebAppConfig.MonComptePro.issuer}`

export const getMonCompteProConnectProfileIssuerUrl = (): string =>
  `${PublicWebAppConfig.MonComptePro.issuer}/.well-known/openid-configuration`

export const getMonCompteProConnectChangePasswordUrl = (): string =>
  `${PublicWebAppConfig.MonComptePro.issuer}/login-actions/reset-credentials?client_id=monsuivisocial`
