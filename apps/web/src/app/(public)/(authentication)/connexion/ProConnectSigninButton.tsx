'use client'

import { Route } from 'next'
import React, { useState } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import classNames from 'classnames'
import { signIn } from 'next-auth/react'
import { proConnectProviderId } from '@app/web/auth/proConnect'

const ProConnectSigninButton = ({
  className,
  callbackUrl,
}: {
  className?: string
  callbackUrl: Route
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const onClick = () => {
    if (isLoading) return
    setIsLoading(true)
    signIn(proConnectProviderId, { callbackUrl })
  }
  return (
    <div
      className={classNames(
        'fr-flex fr-direction-column fr-align-items-start',
        className,
      )}
    >
      <Button
        type="button"
        {...buttonLoadingClassname(isLoading, 'fr-connect fr-py-4v')}
        onClick={onClick}
        title="S’identifier avec ProConnect"
      >
        S’identifier avec ProConnect
      </Button>

      <a
        className="fr-link fr-link--sm"
        href="https://proconnect.gouv.fr"
        target="_blank"
        rel="noreferrer"
      >
        Qu’est-ce que ProConnect&nbsp;?
      </a>
    </div>
  )
}

export default ProConnectSigninButton
