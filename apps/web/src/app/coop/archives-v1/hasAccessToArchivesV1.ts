import { SessionUser } from '@app/web/auth/sessionUser'

// Type guard cannot be arrow function
export function hasAccessToArchivesV1<
  T extends {
    mediateur: null | Pick<
      Exclude<SessionUser['mediateur'], null>,
      'conseillerNumerique'
    >
  },
>(
  user: T | null,
): user is T & {
  mediateur: Pick<
    Exclude<SessionUser['mediateur'], null>,
    'conseillerNumerique'
  >
} {
  return !!user?.mediateur?.conseillerNumerique
}
