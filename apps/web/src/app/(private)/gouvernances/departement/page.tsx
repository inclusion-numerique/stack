import { redirectToGouvernance } from '@app/web/app/(private)/gouvernances/redirectToGouvernance'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * This page only redirects the user to the correct page depending on his role.
 */
export const generateMetadata = async () => {
  await redirectToGouvernance()
}

const Page = () => null

export default Page
