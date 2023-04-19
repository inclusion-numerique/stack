import { secretClient } from '@lb/config/secrets/secretClient'

export const listSecrets = () =>
  secretClient
    .get<{
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
    }>('/', {
      params: {
        page_size: 100,
      },
    })
    .then(({ data }) => data)
