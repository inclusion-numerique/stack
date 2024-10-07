import { Route } from 'next'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import SigninPanel from '@app/web/app/(public)/(authentication)/connexion/SigninPanel'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { LoginSearchParams } from '@app/web/security/login'
import { metadataTitle } from '@app/web/app/metadataTitle'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'

export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Connexion'),
}

const SigninPage = async ({
  searchParams: { error, suivant } = {},
}: {
  searchParams?: { error?: string; suivant?: Route }
}) => {
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
