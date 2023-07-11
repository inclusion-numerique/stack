import { PublicWebAppConfig } from '@app/web/webAppConfig'

export type MonCompteProOrganization = {
  id: number
  is_collectivite_territoriale: boolean
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

export const monCompteProConnectProviderId = 'moncomptepro'

export const getMonCompteProConnectLogoutUrl = (): string =>
  `${PublicWebAppConfig.MonCompteProConnect.issuer}/protocol/openid-connect/logout`

export const getMonCompteProConnectProfilePageUrl = (): string =>
  `${PublicWebAppConfig.MonCompteProConnect.issuer}`

export const getMonCompteProConnectProfileIssuerUrl = (): string =>
  `${PublicWebAppConfig.MonCompteProConnect.issuer}/.well-known/openid-configuration`

export const getMonCompteProConnectChangePasswordUrl = (): string =>
  `${PublicWebAppConfig.MonCompteProConnect.issuer}/login-actions/reset-credentials?client_id=monsuivisocial`
