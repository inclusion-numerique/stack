'use client'

import React, { useEffect } from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import * as Sentry from '@sentry/nextjs'
import { isBrowser } from '@app/web/utils/isBrowser'

const DebugClient = ({
  throwOnServer,
  throwOnCallback,
  throwOnFirstRender,
  throwOnUseEffect,
}: {
  throwOnServer?: boolean
  throwOnFirstRender?: boolean
  throwOnUseEffect?: boolean
  throwOnCallback?: boolean
}) => {
  if (throwOnFirstRender && throwOnServer) {
    throw new Error('DebugClient: throwOnFirstRender SSR server')
  }

  if (throwOnFirstRender && isBrowser && !throwOnServer) {
    throw new Error('DebugClient: throwOnFirstRender browser')
  }

  useEffect(() => {
    if (throwOnUseEffect) {
      throw new Error('DebugClient: throwOnUseEffect')
    }

    setTimeout(() => {
      if (throwOnCallback) {
        throw new Error('DebugClient: throwOnCallback')
      }
    })
  })

  return (
    <ul className="fr-btns-group fr-btns-group--icon-left">
      <li>
        <Button
          className="fr-btn--danger"
          onClick={() => {
            throw new Error('DebugClient: throwOnClick uncaught')
          }}
          iconId="fr-icon-error-line"
        >
          Provoquer une erreur client uncaught
        </Button>
      </li>
      <li>
        <Button
          className="fr-btn--danger"
          onClick={() => {
            Sentry.captureException(
              new Error('DebugClient: throwOnClick caught with Sentry'),
            )
          }}
          iconId="fr-icon-error-line"
        >
          Provoquer une erreur client caught avec Sentry
        </Button>
      </li>
    </ul>
  )
}

export default DebugClient
