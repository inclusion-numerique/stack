import { PublicWebAppConfig } from '@app/web/webAppConfig'
import { EmailSigninForm } from '@app/web/app/(public)/connexion/EmailSigninForm'
import { AuthCard } from '@app/web/app/(public)/connexion/AuthCard'
import styles from './SigninPanel.module.css'

const signinErrorMessage = (error?: string): string | undefined => {
  if (!error) {
    return error
  }

  if (error === 'OAuthAccountNotLinked') {
    return 'Vous venez de vous connecter par un nouvelle méthode. Par sécurité, veuillez utiliser la méthode de connexion que vous avez utilisé initialement.'
  }
  return 'Erreur de connexion, veuillez réessayer.'
}

export const SigninPanel = ({ error }: { error?: string }) => (
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
