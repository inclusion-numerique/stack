import 'server-only'
import { cookies } from 'next/headers'
import { SessionUser } from '@app/web/auth/sessionUser'
import { sessionUserFromSessionToken } from '@app/web/auth/sessionUserFromSessionToken'
import {
  secureSessionCookie,
  sessionCookie,
} from '@app/web/security/authentication'

export const getSessionUser = async (): Promise<SessionUser | null> => {
  const allCookies = cookies()
  const sessionToken =
    allCookies.get(secureSessionCookie) ?? allCookies.get(sessionCookie)

  if (!sessionToken) {
    return null
  }
  return sessionUserFromSessionToken(sessionToken.value)
}

export const getAuthenticatedSessionUser = () =>
  getSessionUser().then((user) => {
    if (!user) {
      throw new Error('Unauthenticated user')
    }
    return user
  })
