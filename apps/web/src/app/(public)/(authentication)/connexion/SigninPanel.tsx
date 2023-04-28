import { PublicWebAppConfig } from '@app/web/webAppConfig'
import { EmailSigninForm } from '@app/web/app/(public)/(authentication)/EmailSigninForm'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import Button from '@codegouvfr/react-dsfr/Button'
import { InclusionConnectSigninButton } from '@app/web/app/(public)/(authentication)/connexion/InclusionConnectSigninButton'
import { signinErrorMessage } from '@app/web/app/(public)/(authentication)/authenticationErrorMessage'
import styles from './SigninPanel.module.css'

export const SigninPanel = ({ error }: { error?: string }) => (
  <AuthCard>
    <h2 style={{ textAlign: 'center' }} className="fr-mb-12v">
      Se connecter à <br />
      {PublicWebAppConfig.projectTitle}
    </h2>
    {error ? (
      <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
        <p>{signinErrorMessage(error)}</p>
      </div>
    ) : null}

    <div className="fr-mb-6v">
      <h5>Se connecter avec Inclusion Connect</h5>
      <div className="fr-connect-group">
        <InclusionConnectSigninButton />
      </div>
    </div>
    <p className="fr-hr-or">ou</p>
    <h5>Se connecter avec votre email</h5>
    <div>
      <EmailSigninForm />
    </div>
    <hr />
    <h5>Vous n’avez pas de compte ?</h5>
    <p>
      <Button linkProps={{ href: '/creer-un-compte' }} priority="secondary">
        Créer un compte
      </Button>
    </p>
  </AuthCard>
)
export const SigninPanelOLD = ({ error }: { error?: string }) => (
  <AuthCard>
    <h2 className={`fr-mb-12v ${styles.signinTitle}`}>
      Se connecter à <br />
      {PublicWebAppConfig.projectTitle}
    </h2>

    {error ? (
      <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
        <p>{signinErrorMessage(error)}</p>
      </div>
    ) : null}

    <div>
      <EmailSigninForm />
    </div>
    <hr className="fr-mt-6v" />
    <p className="fr-mt-6v fr-text--bold">
      Espace réservé aux agents de l&apos;ANCT et du Ministère de la Transition
      écologique et de la Cohésion des territoires
    </p>
    <p>
      Veuillez vous assurer que vous utilisez votre adresse professionnelle pour
      la connexion a ce service. <br />
      <br />
      En cas de problèmes ou questions merci de contacter{' '}
      <a
        href={
          PublicWebAppConfig.contactEmail &&
          `mailto:${PublicWebAppConfig.contactEmail}`
        }
      >
        {PublicWebAppConfig.contactEmail}
      </a>
    </p>
  </AuthCard>
)
