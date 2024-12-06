import type { NextRequest } from 'next/server'

// TODO automatic params parsing from json:api specifications
export const getApiRequestParams = <RequestParams = never>(
  request: NextRequest,
): RequestParams => {
  const { searchParams } = request.nextUrl

  console.log(searchParams)

  return searchParams as unknown as RequestParams
}
