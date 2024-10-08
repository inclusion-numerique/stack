import { NextRequest } from 'next/server'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import {
  secureSessionCookie,
  sessionCookie,
} from '@app/web/security/authentication'
import {
  decodeSerializableState,
  EncodedState,
} from '@app/web/utils/encodeSerializableState'
import { ProconnectSignoutState } from '@app/web/app/(public)/(authentication)/deconnexion/callback/proconnectSignout'
import { prismaClient } from '@app/web/prismaClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * This route will be called on a callback from the identity provider
 * This should be called after proconnect signout flow (see proconnectSignout.ts)
 */
export const GET = async (request: NextRequest) => {
  const { searchParams } = request.nextUrl

  const searchParamsAsObject = Object.fromEntries(searchParams.entries()) as {
    state: EncodedState<ProconnectSignoutState>
  }

  const decodedState = decodeSerializableState(searchParamsAsObject.state, {
    callbackUrl: '/',
    nonce: '',
  })

  const sessionToken = getSessionTokenFromNextRequestCookies(request.cookies)
  const user = await getSessionUserFromSessionToken(sessionToken)

  if (!sessionToken || !user) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  await prismaClient.session.delete({
    where: {
      sessionToken,
    },
  })

  const cookieHeaders = [
    `${secureSessionCookie}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    `${sessionCookie}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
  ]

  const response = new Response('OK', {
    status: 303,
    headers: {
      location: decodedState.callbackUrl,
    },
  })

  for (const cookie of cookieHeaders) {
    response.headers.append('Set-Cookie', cookie)
  }

  return response
}
