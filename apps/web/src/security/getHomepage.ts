import type { SessionUser } from '@app/web/auth/sessionUser'

export const getHomepage = (
  user?:
    | (Pick<SessionUser, 'role'> & {
        inscriptionValidee: Date | string | null
      })
    | null,
) => {
  if (!user) {
    return '/'
  }

  if (user.role === 'Admin') {
    return '/administration'
  }

  if (!user.inscriptionValidee) {
    return '/inscription'
  }

  return '/coop'
}

export const getLoginRedirectUrl = (
  user?:
    | (Pick<SessionUser, 'role'> & {
        inscriptionValidee: Date | string | null
      })
    | null,
) => {
  if (!user) {
    return '/connexion'
  }

  if (user.role === 'Admin') {
    return '/administration/usurpation'
  }

  if (!user.inscriptionValidee) {
    return '/inscription'
  }

  return '/coop'
}
