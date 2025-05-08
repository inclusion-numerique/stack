import SigninPanel from '@app/web/app/(public)/(authentication)/connexion/SigninPanel'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { Route } from 'next'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Connexion'),
}

const SigninPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; suivant?: Route }>
}) => {
  const { error, suivant } = await searchParams
  const user = await getSessionUser()

  const callbackUrl = suivant ?? '/connexion/suivant'

  if (user) {
    redirect(getServerUrl(callbackUrl))
  }

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <Breadcrumbs currentPage="Connexion" />
      <main id={contentId}>
        <SigninPanel error={error} callbackUrl={callbackUrl} />
      </main>
    </>
  )
}

export default SigninPage
