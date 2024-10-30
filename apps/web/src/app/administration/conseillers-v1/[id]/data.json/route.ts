import { NextRequest } from 'next/server'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { findConseillerNumeriqueV1 } from '@app/web/external-apis/conseiller-numerique/searchConseillerNumeriqueV1'

export const GET = async (request: NextRequest) => {
  const conseillerNumeriqueId = request.nextUrl.pathname.split('/').at(-2)

  if (!conseillerNumeriqueId) {
    return new Response('Missing conseiller numerique id', { status: 400 })
  }

  const sessionToken = getSessionTokenFromNextRequestCookies(request.cookies)
  const user = await getSessionUserFromSessionToken(sessionToken)

  if (user?.role !== 'Admin') {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  const result = await findConseillerNumeriqueV1({ id: conseillerNumeriqueId })

  if (!result) {
    return new Response('Conseiller not found', { status: 404 })
  }

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}
