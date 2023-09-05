import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'
import * as Sentry from '@sentry/nextjs'
import DebugClient from '@app/web/app/(public)/debug/DebugClient'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import ErrorBoundary from '@app/web/components/ErrorBoundary'

export const dynamic = 'force-dynamic'
export const revalidate = 0
const ErrorButtonLink = ({ title, href }: { title: string; href: string }) => (
  <li>
    <Button
      className="fr-btn--danger"
      linkProps={{
        href,
      }}
      iconId="fr-icon-error-line"
      iconPosition="left"
    >
      {title}
    </Button>
  </li>
)

const Page = ({
  searchParams: {
    throwOnFirstRender,
    throwOnUseEffect,
    throwAndCatchOnServer,
    throwOnServer,
    throwOnCallback,
  } = {},
}: {
  searchParams?: {
    throwOnServer?: string
    throwAndCatchOnServer?: string
    throwOnFirstRender?: string
    throwOnUseEffect?: string
    throwOnCallback?: string
  }
}) => {
  if (throwOnServer && !throwOnFirstRender) {
    throw new Error('DebugClient: throwOnServer RSC')
  }

  if (throwAndCatchOnServer) {
    Sentry.captureException(new Error('DebugClient: throwAndCatchOnServer RSC'))
  }

  return (
    <>
      <div className="fr-container">
        <Breadcrumbs currentPage="Tests techniques" />
        <h2>Page de tests techniques à l’attention des développeurs</h2>
      </div>
      <div className="fr-container fr-container--narrow">
        <h6>Gestion des erreurs serveur et client</h6>

        <ul className="fr-btns-group fr-btns-group--icon-left">
          <ErrorButtonLink
            href="/debug?throwOnServer=1"
            title="Provoquer une erreur au rendu serveur RSC"
          />
          <ErrorButtonLink
            href="/debug?throwAndCatchOnServer=1"
            title="Provoquer une erreur caught par Sentry au rendu serveur RSC"
          />
          <ErrorButtonLink
            href="/debug?throwOnServer=1&throwOnFirstRender=1"
            title="Provoquer une erreur au rendu client component SSR"
          />
          <ErrorButtonLink
            href="/debug?throwOnFirstRender=1"
            title="Provoquer une erreur au rendu client component Browser"
          />
          <ErrorButtonLink
            href="/debug?throwOnUseEffect=1"
            title="Provoquer une erreur au useEffect()"
          />
          <ErrorButtonLink
            href="/debug?throwOnCallback=1"
            title="Provoquer une erreur en callback asynchrone"
          />
        </ul>

        <h6>Gestion des erreurs navigateur</h6>

        <ErrorBoundary>
          <DebugClient
            throwOnServer={!!throwOnServer}
            throwOnUseEffect={!!throwOnUseEffect}
            throwOnFirstRender={!!throwOnFirstRender}
            throwOnCallback={!!throwOnCallback}
          />
        </ErrorBoundary>
      </div>
    </>
  )
}

export default Page
