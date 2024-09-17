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
        'fr-flex fr-direction-column fr-align-items-center fr-width-full',
        className,
      )}
    >
      <div className="fr-btns-group fr-width-full">
        <Button
          type="button"
          {...buttonLoadingClassname(isLoading, 'fr-mx-0 fr-width-full')}
          onClick={onClick}
        >
          S’identifier avec ProConnect
        </Button>
      </div>

      <a
        className="fr-link fr-link--sm"
        href="https://proconnect.gouv.fr"
        target="_blank"
        rel="noreferrer"
      >
        En savoir plus sur ProConnect
      </a>
    </div>
  )
}

export default ProConnectSigninButton
