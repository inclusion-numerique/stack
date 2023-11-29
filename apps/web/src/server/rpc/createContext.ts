import type { FetchCreateContextFnOptions } from '@trpc/server/src/adapters/fetch/types'
import cookie from 'cookie'
import { getSessionTokenFromCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'

export const createContext = async ({
  req,
  resHeaders,
  info,
}: FetchCreateContextFnOptions) => {
  const cookies = cookie.parse(req.headers.get('cookie') || '')
  const sessionToken = getSessionTokenFromCookies(cookies)

  if (!sessionToken) {
    return { req, user: null, resHeaders, info }
  }
  const user = await getSessionUserFromSessionToken(sessionToken)

  return { req, user, resHeaders, info }
}

export type AppContext = Awaited<ReturnType<typeof createContext>>
