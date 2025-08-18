import SignupPanel from '@app/web/app/(public)/(authentication)/creer-un-compte/SignupPanel'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import Alert from '@codegouvfr/react-dsfr/Alert'
import type { Metadata } from 'next'
import { Route } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: metadataTitle('Créer un compte'),
}

export const revalidate = 0
const SigninPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string
    raison?: 'connexion-sans-compte'
    email?: string
    suivant?: Route
  }>
}) => {
  const { email, error, raison, suivant } = await searchParams

  const user = await getSessionUser()
  if (user) {
    redirect(getServerUrl('/'))
  }

  const callbackUrl: Route = suivant ?? '/'

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <Breadcrumbs currentPage="Se créer un compte" />
      <main id={contentId}>
        <div className="fr-container fr-container--narrow">
          <h2>Création de compte sur {PublicWebAppConfig.projectTitle}</h2>
          {raison === 'connexion-sans-compte' ? (
            <Alert
              className="fr-mt-6v"
              closable
              title="Désolé, nous n’avons pas de compte associé à cette adresse email"
              description={`Veuillez créer un compte pour vous connecter à ${PublicWebAppConfig.projectTitle}`}
              severity="info"
            />
          ) : null}
        </div>
        <SignupPanel error={error} email={email} callbackUrl={callbackUrl} />
      </main>
    </>
  )
}

export default SigninPage
