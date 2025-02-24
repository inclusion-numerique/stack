import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { ConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/ConseillerNumeriqueV1Data'
import { fetchConseillerNumeriqueV1Data } from '@app/web/external-apis/conseiller-numerique/fetchConseillerNumeriqueV1Data'
import {
  FindConseillerNumeriqueV1Result,
  findConseillerNumeriqueV1,
} from '@app/web/external-apis/conseiller-numerique/searchConseillerNumeriqueV1'
import { NextRequest } from 'next/server'

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

  let result:
    | FindConseillerNumeriqueV1Result
    | ConseillerNumeriqueV1Data
    | null = await fetchConseillerNumeriqueV1Data({
    v1ConseillerId: conseillerNumeriqueId,
  })

  // This first endpoint does not returns data for deleted conseillers, we try the other one if neede
  if (!result) {
    result = await findConseillerNumeriqueV1({ id: conseillerNumeriqueId })
  }

  if (!result) {
    return new Response('Conseiller not found', { status: 404 })
  }

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}
