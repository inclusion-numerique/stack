import { SessionUser } from '@app/web/auth/sessionUser'

export type UserProfile = Partial<
  Pick<SessionUser, 'mediateur' | 'coordinateur'>
>

export type UserDisplayName = Pick<
  SessionUser,
  'firstName' | 'lastName' | 'email' | 'name'
>

export const getUserDisplayName = (user: UserDisplayName): string => {
  const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
  if (name) return name
  if (user.name) return user.name
  return user.email
}
