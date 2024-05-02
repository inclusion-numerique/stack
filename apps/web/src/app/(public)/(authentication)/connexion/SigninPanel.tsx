import { Route } from 'next'
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
    <h4>{PublicWebAppConfig.projectTitle}</h4>
    {error ? (
      <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
        <p>{signinErrorMessage(error)}</p>
      </div>
    ) : null}
    <div className="fr-connect-group fr-mt-8v">
      <InclusionConnectSigninButton callbackUrl={callbackUrl} />
    </div>
  </AuthCard>
)

export default SigninPanel
