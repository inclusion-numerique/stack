import type { SessionUser } from '@app/web/auth/sessionUser'
import type { AuthenticatedMediateur } from '@app/web/auth/authenticateUser'

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
