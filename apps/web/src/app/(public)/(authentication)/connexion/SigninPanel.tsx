import { Route } from 'next'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import { signinErrorMessage } from '@app/web/app/(public)/(authentication)/authenticationErrorMessage'
import ProConnectSigninButton from '@app/web/app/(public)/(authentication)/connexion/ProConnectSigninButton'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { EmailSigninForm } from '@app/web/app/(public)/(authentication)/connexion/EmailSigninForm'

const SigninPanel = ({
  error,
  callbackUrl,
}: {
  error?: string
  callbackUrl: Route
}) => (
  <AuthCard>
    <h4>{PublicWebAppConfig.projectTitle}</h4>
    {error ? (
      <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
        <p>{signinErrorMessage(error)}</p>
      </div>
    ) : null}
    {PublicWebAppConfig.isPreview ? (
      <>
        <p>
          La connexion avec ProConnect est uniquement disponible sur les
          environnement de production <i>main</i> et de recette <i>dev</i>.
          <br />
          <br />
          Sur cette environnement de preview <i>{PublicWebAppConfig.Branch}</i>,
          vous pouvez vous connecter avec votre email.
        </p>
        <EmailSigninForm callbackUrl={callbackUrl} />
      </>
    ) : (
      <div className="fr-connect-group fr-mt-8v">
        <ProConnectSigninButton callbackUrl={callbackUrl} />
      </div>
    )}
  </AuthCard>
)

export default SigninPanel
