import { NextResponse } from 'next/server'

export const expectV1ApiResponseJest = async (
  response: NextResponse | Response,
  options?: {
    status?: number
    data?: unknown
  },
) => {
  expect(response.headers.get('content-type')).toBe('application/json')

  const status = options?.status ?? 200
  expect(response.status).toBe(status)

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await response.json()

  expect(json).toEqual(options?.data)
}

export const expect403ApiResponse = (response: NextResponse) =>
  expectV1ApiResponseJest(response, {
    status: 403,
    data: { error: 'Forbidden' },
  })
