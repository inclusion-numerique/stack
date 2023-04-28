import { PublicWebAppConfig } from '@app/web/webAppConfig'
import { EmailSigninForm } from '@app/web/app/(public)/(authentication)/EmailSigninForm'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { InclusionConnectSigninButton } from '@app/web/app/(public)/(authentication)/connexion/InclusionConnectSigninButton'
import { signinErrorMessage } from '@app/web/app/(public)/(authentication)/authenticationErrorMessage'

export const SigninPanel = ({ error }: { error?: string }) => (
  <AuthCard>
    <h4>Connexion à {PublicWebAppConfig.projectTitle}</h4>
    {error ? (
      <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
        <p>{signinErrorMessage(error)}</p>
      </div>
    ) : null}

    <div className="fr-mb-6v">
      <h5>Se connecter avec InclusionConnect</h5>
      <div className="fr-connect-group">
        <InclusionConnectSigninButton />
      </div>
    </div>
    <p className="fr-hr-or">ou</p>
    <h5>Se connecter avec son email</h5>
    <div>
      <EmailSigninForm />
    </div>
    <hr />
    <h5>Vous n’avez pas de compte ?</h5>
    <ButtonsGroup
      buttons={[
        {
          children: 'Créer un compte',
          linkProps: { href: '/creer-un-compte' },
          priority: 'secondary',
        },
      ]}
    />
  </AuthCard>
)
