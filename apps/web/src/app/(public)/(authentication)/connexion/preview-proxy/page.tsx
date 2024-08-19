import { Route } from 'next'
import { notFound, redirect } from 'next/navigation'
import SigninPanel from '@app/web/app/(public)/(authentication)/connexion/SigninPanel'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

export const revalidate = 0

/**
 * This page allows deployed preview env to authenticate using `dev`
 * instance as no wildcards are allowed in proconnect callbacks.
 *
 * - We redirect from preview deployment to this branch
 * - We authenticate on dev if not already authenticated
 * - We create a homemade cookie valid on our preview subdomains with session data
 * - We redirect to preview proxy callback page
 * - The preview proxy callback redirect to the "suivant" query param
 *
 */

// This feature is only accessible on preview deployments
export const generateMetadata = () => {
  if (PublicWebAppConfig.isMain) {
    notFound()
  }
}

const PreviewProxySigninPage = async ({
  searchParams: { error, suivant } = {},
}: {
  searchParams?: { error?: string; suivant?: Route; preview?: string }
}) => {
  const user = await getSessionUser()

  const callbackUrl = suivant ?? '/connexion/suivant'

  if (user) {
    redirect(getServerUrl(callbackUrl))
  }

  return (
    <>
      <Breadcrumbs currentPage="Connexion" />
      <SigninPanel error={error} callbackUrl={callbackUrl} />
    </>
  )
}

export default PreviewProxySigninPage
