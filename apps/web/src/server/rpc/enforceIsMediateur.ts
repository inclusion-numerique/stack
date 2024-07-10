import { SessionUser } from '@app/web/auth/sessionUser'
import { forbiddenError } from '@app/web/server/rpc/trpcErrors'

// assertion functions cannot be arrow functions
export function enforceIsMediateur<
  T extends Pick<SessionUser, 'role' | 'mediateur'> | null,
>(
  user: T,
): asserts user is Exclude<T, null> & {
  role: 'User'
  mediateur: Exclude<Exclude<T, null>['mediateur'], null>
} {
  if (user?.role !== 'User') {
    throw forbiddenError()
  }

  if (!user?.mediateur?.id) {
    throw forbiddenError()
  }
}
