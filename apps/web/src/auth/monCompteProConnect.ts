import { PublicWebAppConfig } from '@app/web/webAppConfig'

export type MonCompteProOrganization = {
  id: string
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

export const monCompteProConnectProviderId = 'moncomptepro'

export const getMonCompteProConnectLogoutUrl = (): string =>
  `${PublicWebAppConfig.MonComptePro.issuer}/protocol/openid-connect/logout`

export const getMonCompteProConnectProfilePageUrl = (): string =>
  `${PublicWebAppConfig.MonComptePro.issuer}`

export const getMonCompteProConnectProfileIssuerUrl = (): string =>
  `${PublicWebAppConfig.MonComptePro.issuer}/.well-known/openid-configuration`

export const getMonCompteProConnectChangePasswordUrl = (): string =>
  `${PublicWebAppConfig.MonComptePro.issuer}/login-actions/reset-credentials`
