import { Route } from 'next'
import { redirect } from 'next/navigation'
import Alert from '@codegouvfr/react-dsfr/Alert'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { PublicWebAppConfig } from '@app/web/webAppConfig'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import { signinErrorMessage } from '@app/web/app/(public)/(authentication)/authenticationErrorMessage'

export const revalidate = 0
const SigninPage = async ({
  searchParams: { error } = {},
}: {
  searchParams?: {
    error?: string
    raison?: 'connexion-sans-compte'
    email?: string
    suivant?: Route
  }
}) => {
  const user = await getSessionUser()
  if (user) {
    redirect(getServerUrl('/profil'))
  }

  return (
    <>
      <Breadcrumbs currentPage="Se créer un compte" />
      <Alert
        closable
        title="Désolé, nous n’avons pas de compte associé à cette adresse email"
        description={`Le service ${PublicWebAppConfig.projectTitle} est uniquement accessible aux agents
          publics autorisés. Veuillez vous rapprocher de votre référent pour la création de compte`}
        severity="info"
      />
      <AuthCard>
        {error ? (
          <>
            <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
              <p>{signinErrorMessage(error)}</p>
            </div>
            <hr className="fr-mt-6v" />
          </>
        ) : null}

        <h5 className="fr-mt-4v fr-mb-12v">Vous avez déjà un compte ?</h5>
        <ButtonsGroup
          buttons={[
            {
              children: 'Se connecter',
              linkProps: { href: '/connexion' },
              priority: 'secondary',
            },
          ]}
        />
      </AuthCard>
    </>
  )
}

export default SigninPage
