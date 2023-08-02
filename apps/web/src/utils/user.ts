import { SessionUser } from '@app/web/auth/sessionUser'

export const getUserDisplayName = (
  user: Pick<SessionUser, 'firstName' | 'lastName' | 'email' | 'name'>,
): string => {
  // Some oauth provider give the name in a single property
  if (user.name) {
    return user.name
  }

  const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
  if (name) {
    return name
  }

  return user.email
}
