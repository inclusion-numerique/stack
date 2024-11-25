import { type NextRequest, NextResponse } from 'next/server'
import type { ApiClientScope } from '@prisma/client'
import { apiV1Version } from '@app/web/app/api/v1/apiV1Version'
import { isAuthenticatedApiClientRequest } from '@app/web/app/api/v1/isAuthenticatedApiClientRequest'

export const apiRoute =
  (
    scopes: ApiClientScope[],
    handler: (request: NextRequest) => Promise<NextResponse>,
  ) =>
  async (request: NextRequest) => {
    const isAuthenticated = await isAuthenticatedApiClientRequest(
      request,
      scopes,
    )

    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const response = await handler(request)

    response.headers.append('x-coop-api-version', apiV1Version)
    return response
  }
