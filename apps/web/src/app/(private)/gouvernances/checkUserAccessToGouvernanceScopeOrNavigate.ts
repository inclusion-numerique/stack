import { notFound, redirect } from 'next/navigation'
import { GouvernanceScope } from '@app/web/app/(private)/gouvernances/gouvernancePaths'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { checkGouvernanceScopeAccess } from '@app/web/app/(private)/gouvernances/checkGouvernanceScopeAccess'

/**
 * Helpers for app/ pages to check user access to a gouvernance scope
 * using domain level checkSopeAccess function.
 */
export const checkUserAccessToGouvernanceScopeOrNavigate = async (
  scope: GouvernanceScope,
) => {
  const user = await getSessionUser()

  const check = await checkGouvernanceScopeAccess({
    scope,
    user,
  })

  if (!user || check.notFound) {
    notFound()
  }

  if (check.redirect) {
    redirect(check.redirect)
  }

  if (!check.access) {
    notFound()
  }
  return user
}
