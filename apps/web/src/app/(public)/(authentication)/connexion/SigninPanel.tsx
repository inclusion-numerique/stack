'use client'

import { Route } from 'next'
import { signIn } from 'next-auth/react'
import MonCompteProButton from '@codegouvfr/react-dsfr/MonCompteProButton'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import { signinErrorMessage } from '@app/web/app/(public)/(authentication)/authenticationErrorMessage'
import { EmailSigninForm } from '@app/web/app/(public)/(authentication)/connexion/EmailSigninForm'
import { PublicWebAppConfig } from '@app/web/webAppConfig'
import { monCompteProConnectProviderId } from '@app/web/auth/monCompteProConnect'

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

    <h5>Se connecter avec Mon Compte Pro</h5>
    <div className="fr-connect-group">
      <MonCompteProButton
        onClick={() => signIn(monCompteProConnectProviderId, { callbackUrl })}
      />
    </div>
    <p className="fr-hr-or fr-mt-6v">ou</p>
    <h5>Se connecter avec son email</h5>
    <EmailSigninForm callbackUrl={callbackUrl} />
  </AuthCard>
)

export default SigninPanel
