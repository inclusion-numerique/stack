import { RdvAccount } from '@prisma/client'

import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { OauthRdvApiGetUserResponse } from '@app/web/rdv-service-public/OAuthRdvApiCallInput'
import { refreshRdvAccessToken } from '@app/web/rdv-service-public/refreshRdvAccessToken'
import { removeUndefinedValues } from '@app/web/utils/removeUndefinedValues'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

export type OAuthRdvApiCallRdvAccount = Pick<
  RdvAccount,
  'id' | 'accessToken' | 'refreshToken' | 'scope' | 'expiresAt'
>

/**
 * executes an API call to the rdv system using the rdvAccount's tokens,
 * handles automatic token refresh, and retries once if the first call fails
 * Pour la documentation des API RDV, voir https://rdv.anct.gouv.fr/api-docs/index.html
 */
export const executeOAuthRdvApiCall = async <ResponseType = unknown>({
  rdvAccount,
  path,
  config,
}: {
  path: string
  rdvAccount: OAuthRdvApiCallRdvAccount
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
    data: config.data ? removeUndefinedValues(config.data) : undefined,
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
      console.error(`RDV API ERROR FOR ENDPOINT ${path}`, error.toJSON())
    }
    // otherwise rethrow
    throw error
  }
}

export const oAuthRdvApiGetUser = async ({
  userId,
  rdvAccount,
}: {
  userId: string // RDV Service Public user id
  rdvAccount: OAuthRdvApiCallRdvAccount
}) =>
  executeOAuthRdvApiCall<OauthRdvApiGetUserResponse>({
    path: `/users/${userId}`,
    rdvAccount,
    config: {
      method: 'GET',
    },
  })
