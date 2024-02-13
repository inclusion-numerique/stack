import { SessionUser } from '@app/web/auth/sessionUser'

export const getDonneesRouteForUser = (user: SessionUser | null) => {
  if (!user) {
    return '/acceder-aux-donnees'
  }

  if (user.role === 'PrefectureDepartement' && user.roleScope) {
    return `/donnees/departements/${user.roleScope}`
  }

  if (user.role === 'PrefectureRegion' && user.roleScope) {
    return `/donnees/regions/${user.roleScope}`
  }

  // user logged in without particular data to identify scope, we redirect to choice page
  return '/donnees/choix-du-departement'
}
