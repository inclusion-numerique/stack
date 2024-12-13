import { redirect } from 'next/navigation'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { AuthenticationError } from '@app/web/auth/AuthenticationError'
import {
  type ConseillerNumeriqueUser,
  type CoordinateurUser,
  isConseillerNumerique,
  isCoordinateur,
  isMediateur,
  type MediateurUser,
} from '@app/web/auth/userTypeGuards'

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

export const authenticateMediateur = async (
  redirectTo = '/connexion',
): Promise<MediateurUser> => {
  const user = await authenticateUser(redirectTo)
  if (isMediateur(user)) return user
  redirect(redirectTo)
}

export const authenticateCoordinateur = async (
  redirectTo = '/connexion',
): Promise<CoordinateurUser> => {
  const user = await authenticateUser(redirectTo)
  if (isCoordinateur(user)) return user
  redirect(redirectTo)
}

export const authenticateMediateurOrCoordinateur = async (
  redirectTo = '/connexion',
): Promise<MediateurUser | CoordinateurUser> => {
  const user = await authenticateUser(redirectTo)
  if (isMediateur(user) || isCoordinateur(user)) return user
  redirect(redirectTo)
}

export const authenticateConseillerNumeriqueOrCoordinateur = async (
  redirectTo = '/connexion',
): Promise<ConseillerNumeriqueUser | CoordinateurUser> => {
  const user = await authenticateUser(redirectTo)
  if (isConseillerNumerique(user) || isCoordinateur(user)) return user
  redirect(redirectTo)
}
