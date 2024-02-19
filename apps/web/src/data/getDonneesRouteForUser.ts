import { SessionUser } from '@app/web/auth/sessionUser'
import { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'

export const getDonneesRouteForUser = (
  user: SessionUser | null,
  lastVisitedScope: GouvernanceScope | null,
) => {
  if (lastVisitedScope?.national) {
    return '/donnees/national'
  }

  if (lastVisitedScope?.codeDepartement) {
    return `/donnees/departements/${lastVisitedScope.codeDepartement}`
  }

  if (lastVisitedScope?.codeRegion) {
    return `/donnees/regions/${lastVisitedScope.codeRegion}`
  }

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
