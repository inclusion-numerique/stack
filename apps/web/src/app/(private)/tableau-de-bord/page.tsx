import { redirectToTableauDeBord } from '@app/web/app/(private)/tableau-de-bord/redirectToTableauDeBord'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * This page only redirects the user to the correct dashboard depending on his role.
 */
export const generateMetadata = async () => {
  await redirectToTableauDeBord()
}

const Page = () => null

export default Page
