import { redirect } from 'next/navigation'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getDonneesRouteForUser } from '@app/web/data/getDonneesRouteForUser'
import { getLastVisitedGouvernanceScopeServer } from '@app/web/app/getLastVisitedGouvernanceScope.server'

/**
 * This route only exists to redirect to the correct "données" page
 */

export const generateMetadata = async () => {
  const user = await getSessionUser()
  const lastVisitedScope = getLastVisitedGouvernanceScopeServer()

  redirect(getDonneesRouteForUser(user, lastVisitedScope))
}

const Page = () => null

export default Page
