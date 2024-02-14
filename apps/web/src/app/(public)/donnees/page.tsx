import { redirect } from 'next/navigation'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getDonneesRouteForUser } from '@app/web/app/(public)/donnees/getDonneesRouteForUser'

/**
 * This route only exists to redirect to the correct "données" page
 */
const Page = async () => {
  const user = await getSessionUser()

  redirect(getDonneesRouteForUser(user))
}

export default Page
