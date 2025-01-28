import { Route } from 'next'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import { signinErrorMessage } from '@app/web/app/(public)/(authentication)/authenticationErrorMessage'
import ProConnectSigninButton from '@app/web/app/(public)/(authentication)/connexion/ProConnectSigninButton'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { EmailSigninForm } from '@app/web/app/(public)/(authentication)/connexion/EmailSigninForm'
import LogoCoop from '@app/web/components/LogoCoop'

const SigninPanel = ({
  error,
  callbackUrl,
}: {
  error?: string
  callbackUrl: Route
}) => (
  <AuthCard>
    <div className="fr-flex fr-width-full fr-justify-content-center">
      <LogoCoop />
    </div>
    <p className="fr-text--xl fr-text--center fr-mb-0 fr-mt-8v">
      Accédez à ce service grâce à <strong>ProConnect</strong>, votre
      identifiant unique pour accéder à plusieurs services de l’État.
    </p>

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
    ) : PublicWebAppConfig.isSante ? (
      <EmailSigninForm callbackUrl={callbackUrl} />
    ) : (
      <ProConnectSigninButton className="fr-mt-8v" callbackUrl={callbackUrl} />
    )}
  </AuthCard>
)

export default SigninPanel
