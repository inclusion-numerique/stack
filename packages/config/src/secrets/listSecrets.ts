import { requestSecretClientWithRetry } from '@app/config/secrets/secretClient'

export const listSecrets = () =>
  requestSecretClientWithRetry<{
    secrets: {
      id: string
      project_id: string
      name: string
      status: 'ready' | 'locked'
      created_at: string
      updated_at: string
      tags: string[]
      version_count: number
      description: string
      region: string
    }[]
  }>({
    method: 'GET',
    url: '/',
    params: {
      page_size: 100,
    },
  }).then(({ data }) => data)
