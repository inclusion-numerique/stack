import { redirect } from 'next/navigation'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getLastVisitedGouvernanceScopeServer } from '@app/web/app/getLastVisitedGouvernanceScope.server'
import { getGouvernancesRouteForUser } from '@app/web/app/(public)/gouvernance/getGouvernancesRouteForUser'

export const dynamic = 'force-dynamic'
export const revalidate = 0
/**
 * This page only redirects the user to the correct gouvernances page
 */

export const generateMetadata = async () => {
  const user = await getSessionUser()
  const lastVisitedScope = getLastVisitedGouvernanceScopeServer()

  redirect(getGouvernancesRouteForUser(user, lastVisitedScope))
}
const Page = () => null

export default Page
