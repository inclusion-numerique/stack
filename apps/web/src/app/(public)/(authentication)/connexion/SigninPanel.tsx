import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import { signinErrorMessage } from '@app/web/app/(public)/(authentication)/authenticationErrorMessage'
import { EmailSigninForm } from '@app/web/app/(public)/(authentication)/connexion/EmailSigninForm'
import ProConnectSigninButton from '@app/web/app/(public)/(authentication)/connexion/ProConnectSigninButton'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import type { Route } from 'next'

const SigninPanel = ({
  error,
  callbackUrl,
}: {
  error?: string
  callbackUrl: Route
}) => (
  <AuthCard>
    <h1 className="fr-h4">Connexion à {PublicWebAppConfig.projectTitle}</h1>
    {error ? (
      <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
        <p>{signinErrorMessage(error)}</p>
      </div>
    ) : null}
    {PublicWebAppConfig.isPreview ? (
      <p>
        La connexion avec ProConnect est uniquement disponible sur les
        environnement de production <i>main</i> et de recette <i>dev</i>.
        <br />
        <br />
        Sur cette environnement de preview <i>{PublicWebAppConfig.Branch}</i>,
        vous pouvez vous connecter avec votre email.
      </p>
    ) : (
      <div className="fr-connect-group">
        <ProConnectSigninButton
          className="fr-mt-8v"
          callbackUrl={callbackUrl}
        />
      </div>
    )}
    <p className="fr-hr-or fr-mt-6v">ou</p>
    <h5>Se connecter avec son email</h5>
    <EmailSigninForm callbackUrl={callbackUrl} />
    <hr className="fr-mt-6v" />
    <h5 className="fr-mt-4v">Vous n’avez pas de compte ?</h5>
    <ButtonsGroup
      buttons={[
        {
          children: 'Créer un compte',
          linkProps: {
            href:
              callbackUrl === '/'
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
