/* eslint react/destructuring-assignment: 0 */

'use client'

import React, { Component, PropsWithChildren, ReactNode } from 'react'
import * as Sentry from '@sentry/nextjs'
import Alert from '@codegouvfr/react-dsfr/Alert'
import { PublicWebAppConfig } from '@app/web/webAppConfig'

class ErrorBoundary extends Component<
  PropsWithChildren<{ fallback?: ReactNode }>,
  { hasError: boolean }
> {
  constructor(props: PropsWithChildren) {
    super(props)

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_error: unknown) {
    // Update state so the next render will show the fallback UI

    return { hasError: true }
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // You can use your own error logging service here
    Sentry.captureException(error)
    console.error({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <Alert
            className="fr-mb-6v"
            title="Une erreur est survenue"
            description={`Veuillez réessayer ultérieurement ou rafraichir la page. Si le problème persiste, contactez-nous à l'adresse ${PublicWebAppConfig.contactEmail}`}
            severity="error"
          />
        )
      )
    }

    // Return children components in case of no error
    return this.props.children
  }
}

export default ErrorBoundary
