import { NextRequest } from 'next/server'
import { ApiClientScope } from '@prisma/client'
import {
  apiV1ClientIdHeader,
  apiV1ClientSecretHeader,
} from '@app/web/app/api/v1/apiV1Headers'
import { authenticateApiCient } from '@app/web/api-client/apiClient'

export const isAuthenticatedApiClientRequest = async (
  request: NextRequest,
  scopes: ApiClientScope[],
) => {
  // Get api key from header
  const clientId = request.headers.get(apiV1ClientIdHeader)

  if (!clientId) {
    return false
  }

  const clientSecret = request.headers.get(apiV1ClientSecretHeader)

  if (!clientSecret) {
    return false
  }

  const client = await authenticateApiCient(clientId, clientSecret)
  if (!client) {
    return false
  }

  // Ensure that all scopes in parameters are present in the client scopes
  for (const scope of scopes) {
    if (!client.scopes.includes(scope)) {
      return false
    }
  }

  return true
}
