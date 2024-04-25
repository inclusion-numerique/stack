import { Route } from 'next'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import { signinErrorMessage } from '@app/web/app/(public)/(authentication)/authenticationErrorMessage'
import InclusionConnectSigninButton from '@app/web/app/(public)/(authentication)/connexion/InclusionConnectSigninButton'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

const SigninPanel = ({
  error,
  callbackUrl,
}: {
  error?: string
  callbackUrl: Route
}) => (
  <AuthCard>
    <h4>Connexion à {PublicWebAppConfig.projectTitle}</h4>
    {error ? (
      <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
        <p>{signinErrorMessage(error)}</p>
      </div>
    ) : null}

    <h5>Se connecter avec InclusionConnect</h5>
    <div className="fr-connect-group">
      <InclusionConnectSigninButton callbackUrl={callbackUrl} />
    </div>
    <hr className="fr-mt-6v" />
    <h5 className="fr-mt-4v">Vous n’avez pas de compte ?</h5>
    <ButtonsGroup
      buttons={[
        {
          children: 'Créer un compte',
          linkProps: {
            href:
              callbackUrl === '/' || callbackUrl === '/connexion/suivant'
                ? '/creer-un-compte'
                : `/creer-un-compte?suivant=${callbackUrl}`,
          },
          priority: 'secondary',
        },
      ]}
    />
  </AuthCard>
)

export default SigninPanel
