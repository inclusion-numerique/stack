import { ApiClient, ApiClientScope } from '@prisma/client'
import { generateRandomSecret } from '@app/web/security/generateRandomSecret'
import { hashSecret, verifySecret } from '@app/web/security/hashSecret'
import { prismaClient } from '@app/web/prismaClient'

export type CreateApiClientInput = {
  name: string
  scopes: ApiClientScope[]
  validUntil?: Date
  validFrom?: Date
}

export const createApiClient = async ({
  name,
  scopes,
  validFrom,
  validUntil,
}: CreateApiClientInput): Promise<
  Omit<ApiClient, 'secret'> & {
    secret: string
  }
> => {
  const plainSecret = generateRandomSecret()
  const hashedSecret = hashSecret(plainSecret)

  const apiClient = await prismaClient.apiClient.create({
    data: {
      name,
      secret: hashedSecret,
      validFrom: validFrom ?? new Date(),
      validUntil,
      scopes,
    },
  })

  return {
    ...apiClient,
    secret: plainSecret,
  }
}

export const authenticateApiCient = async (
  clientId: string,
  clientSecret: string,
): Promise<ApiClient | null> => {
  const apiClient = await prismaClient.apiClient.findUnique({
    where: { id: clientId },
  })

  if (!apiClient) return null

  const isValid = verifySecret(clientSecret, apiClient.secret)

  if (!isValid) return null

  const now = new Date()
  if (apiClient.validFrom > now || apiClient.validUntil < now) return null

  return apiClient
}
