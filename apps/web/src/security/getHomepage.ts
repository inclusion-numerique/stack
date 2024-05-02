import type { SessionUser } from '@app/web/auth/sessionUser'

export const getHomepage = (user?: Pick<SessionUser, 'role'> | null) => {
  if (!user) {
    return '/connexion'
  }

  if (user.role === 'Admin') {
    return '/administration'
  }

  return '/coop'
}
