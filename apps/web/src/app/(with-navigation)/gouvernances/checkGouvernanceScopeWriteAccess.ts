import { SessionUser } from '@app/web/auth/sessionUser'
import { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'
import { getRegionDepartements } from '@app/web/data/getRegionDepartements'

/**
 * Determine if the user has access to the given gouvernance scope for edition and sensitive data acess.
 */
export const checkGouvernanceScopeWriteAccess = async ({
  scope,
  user,
}: {
  scope: GouvernanceScope
  user: SessionUser | null
}): Promise<boolean> => {
  if (!user) {
    return false
  }

  // National scope only for admin and demo.
  // They can access all scopes
  if (user.role === 'Administrator' || user.role === 'Demo') {
    return true
  }

  // Region scope only for region users
  if ('codeRegion' in scope && scope.codeRegion) {
    return (
      user.role === 'PrefectureRegion' && user.roleScope === scope.codeRegion
    )
  }

  // Departement scope only for departement users or region users with access to the departement
  if ('codeDepartement' in scope && scope.codeDepartement) {
    if (
      user.role === 'PrefectureDepartement' &&
      user.roleScope === scope.codeDepartement
    ) {
      return true
    }

    if (user.role === 'PrefectureRegion' && user.roleScope) {
      const region = await getRegionDepartements(user.roleScope)
      return region.departements.some(
        (departement) => departement.code === scope.codeDepartement,
      )
    }
  }

  return false
}
