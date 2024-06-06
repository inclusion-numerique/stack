import type { SessionUser } from '@app/web/auth/sessionUser'

export const getHomepage = (
  user?: Pick<SessionUser, 'role' | 'inscriptionValidee'> | null,
) => {
  if (!user) {
    return '/connexion'
  }

  if (user.role === 'Admin') {
    return '/administration'
  }

  if (!user.inscriptionValidee) {
    return '/inscription'
  }

  return '/coop'
}