import { Route } from 'next'
import { redirect } from 'next/navigation'
import Alert from '@codegouvfr/react-dsfr/Alert'
import SignupPanel from '@app/web/app/(public)/(authentication)/creer-un-compte/SignupPanel'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { PublicWebAppConfig } from '@app/web/webAppConfig'

const SigninPage = async ({
  searchParams: { error, email, raison } = {},
}: {
  searchParams?: {
    error?: string
    raison?: 'connexion-sans-compte'
    email?: string
  }
}) => {
  const user = await getSessionUser()
  if (user) {
    redirect(getServerUrl('/'))
  }

  // There will be different callback url e.g. for directly creating a resource
  const callbackUrl: Route = '/'

  return (
    <>
      <Breadcrumbs currentPage="Créer un compte" />
      <h2>Création de compte sur {PublicWebAppConfig.projectTitle}</h2>
      {raison === 'connexion-sans-compte' ? (
        <Alert
          closable
          title="Désolé, nous n’avons pas de compte associé à cette adresse email"
          description={`Veuillez créer un compte pour vous connecter à ${PublicWebAppConfig.projectTitle}`}
          severity="info"
        />
      ) : null}
      <SignupPanel error={error} email={email} callbackUrl={callbackUrl} />
    </>
  )
}

export default SigninPage
