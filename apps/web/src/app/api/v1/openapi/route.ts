import openapiDoc from '@app/web/app/api/v1/documentation/v1.openapi.json'
import type { NextRequest } from 'next/server'

/**
 * Open API specification in JSON format, publicly available
 */
export const GET = (_request: NextRequest) =>
  new Response(JSON.stringify(openapiDoc), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
