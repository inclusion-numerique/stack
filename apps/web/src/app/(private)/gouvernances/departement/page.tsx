import { redirectToGouvernance } from '@app/web/app/(private)/gouvernances/redirectToGouvernance'

/**
 * This page only redirects the user to the correct page depending on his role.
 */
export const generateMetadata = async () => {
  await redirectToGouvernance()
}

const Page = () => null

export default Page
