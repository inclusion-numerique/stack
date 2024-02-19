import { getSessionUser } from '@app/web/auth/getSessionUser'
import { checkGouvernanceScopeAccess } from '@app/web/app/(private-with-navigation)/gouvernances/checkGouvernanceScopeAccess'
import type { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'

/**
 * Helpers for api routes pages to check user access to a gouvernance scope
 * using domain level checkSopeAccess function.
 */
export const checkUserAccessToGouvernanceScopeForApiResponse = async (
  scope: GouvernanceScope,
) => {
  const user = await getSessionUser()

  const check = await checkGouvernanceScopeAccess({
    scope,
    user,
  })

  return check.access
}
