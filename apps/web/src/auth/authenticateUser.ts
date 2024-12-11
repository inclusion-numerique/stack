import { redirect } from 'next/navigation'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { AuthenticationError } from '@app/web/auth/AuthenticationError'
import { SessionUser } from '@app/web/auth/sessionUser'

/**
 * This gets the session user from request cache and redirects to login
 * with correct callback url if user is not found
 *
 * This should be called in Layout and Page components and be the first
 * call in those components for better readability of authentication logic.
 */
export const authenticateUser = async (redirectTo = '/connexion') => {
  try {
    return await getAuthenticatedSessionUser()
  } catch (error) {
    if (!(error instanceof AuthenticationError)) {
      throw error
    }

    redirect(redirectTo)
  }
}

export type AuthenticatedMediateur = SessionUser & {
  mediateur: Exclude<SessionUser['mediateur'], null>
}

export type AuthenticatedCoordinateur = SessionUser & {
  coordinateur: Exclude<SessionUser['coordinateur'], null>
}

export const authenticateMediateur = async (
  redirectTo = '/connexion',
): Promise<AuthenticatedMediateur> => {
  const user = await authenticateUser(redirectTo)

  if (!user.mediateur) {
    redirect(redirectTo)
  }

  return user as AuthenticatedMediateur
}

export const authenticateCoordinateur = async (
  redirectTo = '/connexion',
): Promise<AuthenticatedCoordinateur> => {
  const user = await authenticateUser(redirectTo)

  if (!user.coordinateur) {
    redirect(redirectTo)
  }

  return user as AuthenticatedCoordinateur
}

export const authenticateMediateurOrCoordinateur = async (
  redirectTo = '/connexion',
): Promise<SessionUser> => {
  const user = await authenticateUser(redirectTo)

  if (!user.mediateur && !user.coordinateur) {
    redirect(redirectTo)
  }

  return user
}
