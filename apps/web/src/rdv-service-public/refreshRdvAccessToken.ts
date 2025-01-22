import type { RdvAccount } from '@prisma/client'
import axios from 'axios'
import {
  rdvServicePublicOAuthConfig,
  rdvServicePublicOAuthTokenEndpoint,
} from '@app/web/rdv-service-public/rdvServicePublicOauth'
import { prismaClient } from '@app/web/prismaClient'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

/**
 * refresh the rdv oauth tokens if expired or about to expire
 * updates the db record in rdvAccount
 * returns a fresh accessToken
 */
export const refreshRdvAccessToken = async (
  rdvAccount: Pick<
    RdvAccount,
    'id' | 'refreshToken' | 'accessToken' | 'expiresAt' | 'scope'
  >,
) => {
  // safety checks
  if (!rdvAccount.refreshToken) {
    throw new Error('no refresh token available to refresh rdv account')
  }

  // refresh token request payload
  const params = new URLSearchParams({
    client_id: rdvServicePublicOAuthConfig.clientId,
    client_secret: ServerWebAppConfig.RdvServicePublic.OAuth.clientSecret,
    grant_type: 'refresh_token',
    refresh_token: rdvAccount.refreshToken,
  })

  const response = await axios.post<{
    access_token: string
    refresh_token?: string
    expires_in: number
    token_type: string
    scope?: string
  }>(rdvServicePublicOAuthTokenEndpoint, params.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })

  const tokens = response.data
  const newExpiresAt = new Date(Date.now() + tokens.expires_in * 1000)

  // update db record
  const updated = await prismaClient.rdvAccount.update({
    where: { id: rdvAccount.id },
    data: {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token ?? rdvAccount.refreshToken,
      expiresAt: newExpiresAt,
      scope: tokens.scope ?? rdvAccount.scope,
    },
  })

  return updated
}
