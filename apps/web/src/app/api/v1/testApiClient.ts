import type { ApiClientScope } from '@prisma/client'
import {
  changeApiClientScopes,
  createApiClient,
} from '@app/web/api-client/apiClient'
import { prismaClient } from '@app/web/prismaClient'

export const testApiClientName = 'test-api-client'

export const testApiClient = {
  initialized: false,
  id: 'will-be-set-after-creation',
  name: testApiClientName,
  secret: 'will-be-set-after-creation',
  hashedSecret: 'will-be-set-after-creation',
}

export const createTestApiClientWithScopes = async ({
  scopes,
}: {
  scopes: ApiClientScope[]
}) => {
  const existingClient = await prismaClient.apiClient.findUnique({
    where: {
      name: testApiClientName,
    },
  })

  if (existingClient && testApiClient.initialized) {
    const updated = await changeApiClientScopes({
      clientId: existingClient.id,
      scopes,
    })

    return updated
  }

  if (existingClient && !testApiClient.initialized) {
    await prismaClient.apiClient.delete({
      where: {
        id: existingClient.id,
      },
    })
  }

  const client = await createApiClient({
    scopes,
    name: testApiClientName,
    validFrom: new Date(),
  })

  testApiClient.initialized = true
  testApiClient.id = client.id
  testApiClient.secret = client.secret
  testApiClient.hashedSecret = client.secretHash

  return client
}
