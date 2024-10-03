import { Route } from 'next'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import { signinErrorMessage } from '@app/web/app/(public)/(authentication)/authenticationErrorMessage'
import EmailSignupForm from '@app/web/app/(public)/(authentication)/creer-un-compte/EmailSignupForm'
import ProConnectSigninButton from '@app/web/app/(public)/(authentication)/connexion/ProConnectSigninButton'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

const SignupPanel = ({
  error,
  email,
  callbackUrl,
}: {
  error?: string
  email?: string
  callbackUrl: Route
}) => (
  <AuthCard>
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
    <h5>Se créer un compte avec son email</h5>
    <EmailSignupForm callbackUrl={callbackUrl} email={email} />
    <hr className="fr-mt-6v" />
    <h5 className="fr-mt-4v">Vous avez déjà un compte ?</h5>
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
)

export default SignupPanel
