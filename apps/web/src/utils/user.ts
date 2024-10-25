import { SessionUser } from '@app/web/auth/sessionUser'

export const getUserDisplayName = (
  user: Pick<SessionUser, 'firstName' | 'lastName' | 'email' | 'name'>,
): string => {
  const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
  if (name) return name
  if (user.name) return user.name
  return user.email
}
