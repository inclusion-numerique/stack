'use client'

import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { rdvOauthLinkAccountFlowUrl } from '@app/web/rdv-service-public/rdvServicePublicOauth'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { Route } from 'next'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const RdvServicePublicSigninButton = ({
  className,
  callbackUrl,
  user,
}: {
  className?: string
  callbackUrl: Route
  user: SessionUser
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const createAccountMutation =
    trpc.rdvServicePublic.createAccount.useMutation()

  const router = useRouter()

  const onClick = async () => {
    if (isLoading) return
    setIsLoading(true)

    try {
      await createAccountMutation.mutateAsync({
        userId: user.id,
      })

      router.push(rdvOauthLinkAccountFlowUrl({ redirectTo: callbackUrl }))
    } catch {
      setIsLoading(false)
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de la création de votre compte, veuillez réessayer ultérieurement.',
      })
    }
  }
  return (
    <div
      className={classNames(
        'fr-flex fr-direction-column fr-align-items-center fr-width-full',
        className,
      )}
    >
      <Button
        type="button"
        {...buttonLoadingClassname(isLoading, 'fr-mb-4v')}
        onClick={onClick}
        title="Se connecter à RdvServicePublic"
      >
        <span className="fr-ml-1v fr-text--left">
          Se connecter à
          <br />
          <strong>RDV Aide Numérique</strong>
        </span>
      </Button>

      <a
        className="fr-link fr-link--sm"
        href="https://rdv.anct.gouv.fr/"
        target="_blank"
        rel="noreferrer"
      >
        En savoir plus sur RDV Aide Numérique
      </a>
    </div>
  )
}

export default withTrpc(RdvServicePublicSigninButton)
