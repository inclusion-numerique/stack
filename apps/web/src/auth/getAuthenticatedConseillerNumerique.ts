import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { AuthenticatedMediateur } from '@app/web/auth/getAuthenticatedMediateur'
import { SessionUser } from '@app/web/auth/sessionUser'

export type AuthenticatedConseillerNumerique = AuthenticatedMediateur & {
  conseillerNumerique: Exclude<
    AuthenticatedMediateur['mediateur']['conseillerNumerique'],
    null
  >
}

// Type guard cannot be arrow function
export function isAuthenticatedConseillerNumerique<T extends SessionUser>(
  user: T | null,
): user is T & {
  mediateur: Exclude<SessionUser['mediateur'], null> & {
    conseillerNumerique: Exclude<
      Exclude<SessionUser['mediateur'], null>['conseillerNumerique'],
      null
    >
  }
} {
  return !!user?.mediateur?.conseillerNumerique
}

export const getAuthenticatedConseillerNumerique = () =>
  getAuthenticatedSessionUser().then((user): AuthenticatedMediateur => {
    if (!user.mediateur?.conseillerNumerique) {
      throw new Error('User is not a conseiller numerique')
    }
    return user as AuthenticatedConseillerNumerique
  })
