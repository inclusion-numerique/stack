import { RdvAccount } from '@prisma/client'

import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { refreshRdvAccessToken } from '@app/web/rdv-service-public/refreshRdvAccessToken'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

/**
 * executes an API call to the rdv system using the rdvAccount's tokens,
 * handles automatic token refresh, and retries once if the first call fails
 */
export const executeOAuthRdvApiCall = async <ResponseType = unknown>({
  rdvAccount,
  path,
  config,
}: {
  path: string
  rdvAccount: Pick<
    RdvAccount,
    'id' | 'accessToken' | 'refreshToken' | 'scope' | 'expiresAt'
  >
  config: Omit<AxiosRequestConfig, 'url'>
}) => {
  // check if token is expired or about to expire
  const now = Date.now()
  const willExpireSoon =
    !!rdvAccount.expiresAt && rdvAccount.expiresAt.getTime() - now < 60_000 // <1min

  let currentAccessToken = rdvAccount.accessToken
  let accountToUse = rdvAccount

  // refresh if it's already expired or will soon expire
  if (willExpireSoon) {
    accountToUse = await refreshRdvAccessToken(rdvAccount)
    currentAccessToken = accountToUse.accessToken
  }

  const requestConfig: AxiosRequestConfig = {
    ...config,
    url: `https://${PublicWebAppConfig.RdvServicePublic.OAuth.hostname}/api/v1${path}`,
    headers: {
      Authorization: `Bearer ${currentAccessToken}`,
      ...config.headers,
    },
  }

  try {
    // first attempt
    const response = await axios<ResponseType>(requestConfig)
    return response.data
  } catch (error) {
    // if token was invalid or expired in the meantime, attempt a refresh and retry once
    if (error instanceof AxiosError) {
      const status = error.response?.status
      // typical invalid token scenario: 401
      if (status === 401) {
        // refresh and retry once
        const updated = await refreshRdvAccessToken(accountToUse)
        const retryConfig: AxiosRequestConfig = {
          ...requestConfig,
          headers: {
            ...requestConfig.headers,
            Authorization: `Bearer ${updated.accessToken}`,
          },
        }
        const retryResponse = await axios<ResponseType>(retryConfig)
        return retryResponse.data
      }
    }
    // otherwise rethrow
    throw error
  }
}
