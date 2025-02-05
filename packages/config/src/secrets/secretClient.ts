import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import pRetry, { type Options as PRetryOptions } from 'p-retry'
import { region } from '@app/config/config'

export const projectId = process.env.SCW_PROJECT_ID ?? ''

const authToken =
  process.env.SCW_API_KEY_SECRET ?? process.env.SCW_SECRET_KEY ?? ''

// https://developers.scaleway.com/en/products/secret_manager/api/v1alpha1/#introduction
export const secretClient = axios.create({
  baseURL: `https://api.scaleway.com/secret-manager/v1alpha1/regions/${region}/secrets`,
  headers: { 'X-Auth-Token': authToken },
  params: {
    project_id: projectId,
  },
})

export const requestSecretClientWithRetry = async <T = unknown>(
  config: AxiosRequestConfig,
  retryOptions?: PRetryOptions,
): Promise<AxiosResponse<T>> =>
  pRetry(
    async () => secretClient.request<T>(config),
    retryOptions ?? {
      retries: 7,
      factor: 2,
      minTimeout: 1000,
      maxTimeout: 10_000,
    },
  )
