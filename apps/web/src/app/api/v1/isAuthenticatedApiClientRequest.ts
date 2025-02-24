import { authenticateApiCient } from '@app/web/api-client/apiClient'
import {
  apiV1AuthorizationHeader,
  apiV1AuthorizationScheme,
} from '@app/web/app/api/v1/apiV1Headers'
import { ApiClientScope } from '@prisma/client'
import { NextRequest } from 'next/server'

export const isAuthenticatedApiClientRequest = async (
  request: NextRequest,
  scopes: ApiClientScope[],
) => {
  // Get api key from header
  const authorizationString = request.headers.get(apiV1AuthorizationHeader)

  if (!authorizationString) {
    return false
  }

  const [scheme, value] = authorizationString.split(' ')

  if (scheme !== apiV1AuthorizationScheme) {
    return false
  }

  if (!value) {
    return false
  }

  const [clientId, clientSecret] = value.split(':')

  if (!clientId || !clientSecret) {
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
