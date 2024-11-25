/* eslint no-param-reassign: 0 */
import { NextRequest } from 'next/server'
import {
  apiV1ClientIdHeader,
  apiV1ClientSecretHeader,
} from '@app/web/app/api/v1/apiV1Headers'

export const createTestApiV1Request = ({
  client,
  body,
  method,
  url,
  headers = {},
}: {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: Record<string, unknown>
  headers?: HeadersInit
  client?: {
    id: string
    secret: string
  }
}) => {
  const options = {
    headers: {
      ...(client
        ? {
            [apiV1ClientIdHeader]: client.id,
            [apiV1ClientSecretHeader]: client.secret,
          }
        : {}),
      ...headers,
    },
    method,
    body: JSON.stringify(body),
  } satisfies RequestInit

  const request = new Request(`http://localhost:3000${url}`, options)
  return new NextRequest(request)
}
