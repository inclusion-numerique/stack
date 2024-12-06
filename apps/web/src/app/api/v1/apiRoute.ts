import { type NextRequest, NextResponse } from 'next/server'
import type { ApiClientScope } from '@prisma/client'
import { isAuthenticatedApiClientRequest } from '@app/web/app/api/v1/isAuthenticatedApiClientRequest'
import { getApiRequestParams } from '@app/web/app/api/v1/getApiRequestParams'

export const apiRoute =
  <ResponseType, RequestParams = unknown>(
    scopes: ApiClientScope[],
    handler: (
      request: NextRequest,
      params: RequestParams,
    ) => Promise<NextResponse<ResponseType>>,
  ) =>
  async (request: NextRequest) => {
    const isAuthenticated = await isAuthenticatedApiClientRequest(
      request,
      scopes,
    )

    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const params = getApiRequestParams<RequestParams>(request)

    const response = await handler(request, params)

    return response
  }
