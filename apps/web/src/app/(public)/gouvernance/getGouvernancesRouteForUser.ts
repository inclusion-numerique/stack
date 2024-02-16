import { SessionUser } from '@app/web/auth/sessionUser'
import { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'

export const getGouvernancesRouteForUser = (
  user: SessionUser | null,
  lastVisitedScope: GouvernanceScope | null,
) => {
  if (lastVisitedScope?.national) {
    return '/gouvernances/national'
  }

  if (lastVisitedScope?.codeDepartement) {
    return `/gouvernances/departements/${lastVisitedScope.codeDepartement}`
  }

  if (lastVisitedScope?.codeRegion) {
    return `/gouvernances/regions/${lastVisitedScope.codeRegion}`
  }

  if (!user) {
    return '/acceder-aux-donnees'
  }

  if (user.role === 'PrefectureDepartement' && user.roleScope) {
    return `/gouvernances/departements/${user.roleScope}`
  }

  if (user.role === 'PrefectureRegion' && user.roleScope) {
    return `/gouvernances/regions/${user.roleScope}`
  }

  // user logged in without particular data to identify scope, we redirect to choice page
  return '/donnees/choix-du-departement'
}
