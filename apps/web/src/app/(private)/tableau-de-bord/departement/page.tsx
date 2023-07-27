import { redirectToTableauDeBord } from '@app/web/app/(private)/tableau-de-bord/redirectToTableauDeBord'

/**
 * This page only redirects the user to the correct dashboard depending on his role.
 */
export const generateMetadata = async () => {
  await redirectToTableauDeBord()
}

const Page = () => null

export default Page
