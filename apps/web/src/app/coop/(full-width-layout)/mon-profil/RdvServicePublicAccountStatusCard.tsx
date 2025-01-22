'use client'

import React, { useEffect } from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { SessionUser } from '@app/web/auth/sessionUser'
import Card from '@app/web/components/Card'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import CreateOrUpdateRdvServicepublicAccountButton from '@app/web/rdv-service-public/CreateOrUpdateRdvServicePublicAccountButton'
import { Spinner } from '@app/web/ui/Spinner'
import { rdvOauthLinkAccountFlowUrl } from '@app/web/rdv-service-public/rdvServicePublicOauth'

const RdvServicePublicAccountStatusCard = ({
  user,
  oAuthFlowRedirectTo,
}: {
  user: Pick<SessionUser, 'id' | 'rdvAccount'>
  oAuthFlowRedirectTo: string
}) => {
  const oauthApiCallMutation = trpc.rdvServicePublic.oAuthApiMe.useMutation()
  const { rdvAccount } = user

  useEffect(() => {
    if (!rdvAccount?.hasOauthTokens) return
    oauthApiCallMutation.mutate({
      endpoint: '/agents/me',
      data: undefined,
    })
  }, [rdvAccount])

  return (
    <Card
      noBorder
      className="fr-border fr-border-radius--8"
      contentSeparator
      id="description"
      title={
        <span className="fr-text-title--blue-france">
          Accéder à RDV Aide Numérique
        </span>
      }
      titleAs="h2"
    >
      <p className="fr-text--medium fr-mb-4v">
        Reliez votre compte RDV Aide Numérique pour accéder à vos rendez-vous en
        2 étapes :
      </p>
      <p>
        <strong>
          1. Configurez votre compte RDV Aide Numérique avec votre équipe et vos
          lieux d’activités de la coop en un clic
        </strong>
      </p>
      <ul className="fr-mb-4v">
        <li>
          Si vous n’avez pas de compte RDV Aide Numérique, il sera
          automatiquement créé pour vous. Vous recevrez un email de confirmation
          pour choisir votre mot de passe RDV Aide Numérique et activer votre
          compte avant de passer à l’étape suivante.
        </li>
        <li>
          Si vous avez déjà un compte RDV Aide Numérique, il sera
          automatiquement mis à jour avec vos informations de l’équipe et vos
          lieux d’activités de la coop.
        </li>
      </ul>
      <CreateOrUpdateRdvServicepublicAccountButton user={user} />
      <hr className="fr-separator-4v" />
      <p>
        <strong>
          2. Autorisez la Coop à communiquer avec votre compte RDV Aide
          Numérique
        </strong>
        <br />
        Une fois votre compte RDV Aide Numérique configuré et activé, vous
        pouvez lier votre compte à la coop en cliquant sur le bouton ci-dessous.{' '}
        <br />
        Cela vous guidera sur une page sur RDV Aide Numérique où vous pourrez
        autoriser la Coop à communiquer avec votre compte RDV Aide Numérique.
        <br />
        Cela permettra de vous connecter à vos rendez-vous et d’utiliser les
        fonctionnalités d’intégration avec RDV Aide Numérique que nous sommes en
        train de développer.
      </p>
      <div
        className={classNames(
          'fr-flex fr-direction-column fr-align-items-center fr-width-full',
        )}
      >
        {!rdvAccount && (
          <Notice
            title="Vous devez avoir créé et activé votre compte RDV Aide Numérique à l'étape 1 avant de pouvoir autoriser la Coop à communiquer avec votre compte RDV Aide Numérique."
            className="fr-mt-4v fr-notice--warning"
          />
        )}
        {oauthApiCallMutation.isIdle ||
          (oauthApiCallMutation.isPending && (
            <div className="fr-width-full fr-my-4v fr-flex fr-align-items-center fr-justify-content-center">
              <Spinner />
            </div>
          ))}
        {oauthApiCallMutation.isError && (
          <Button
            linkProps={{
              href: rdvOauthLinkAccountFlowUrl({
                redirectTo: oAuthFlowRedirectTo,
              }),
            }}
            iconId="fr-icon-lock-line"
          >
            Autoriser la Coop à communiquer avec votre compte RDV Aide Numérique
          </Button>
        )}
        {oauthApiCallMutation.isSuccess && (
          <>
            <Notice
              title="Votre compte RDV Aide Numérique est configurée correctement."
              className="fr-mt-4v fr-notice--success"
            />
            <Button
              className="fr-mt-4v"
              priority="tertiary"
              iconId="fr-icon-lock-line"
              linkProps={{
                href: rdvOauthLinkAccountFlowUrl({
                  redirectTo: oAuthFlowRedirectTo,
                }),
              }}
            >
              Reconnecter votre compte RDV Aide Numérique
            </Button>
          </>
        )}
      </div>
    </Card>
  )
}

export default withTrpc(RdvServicePublicAccountStatusCard)
