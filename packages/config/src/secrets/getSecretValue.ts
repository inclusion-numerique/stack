import { requestSecretClientWithRetry } from '@app/config/secrets/secretClient'

/**
 * Returns decoded secret value
 */
export const getSecretValue = ({
  id,
  revision = 'latest',
}: {
  id: string
  revision?: string
}) =>
  requestSecretClientWithRetry<{
    secret_id: string
    revision: string
    data: string
  }>({
    url: `/${id}/versions/${revision}/access`,
    method: 'GET',
  }).then(({ data }) => Buffer.from(data.data, 'base64').toString('utf8'))
