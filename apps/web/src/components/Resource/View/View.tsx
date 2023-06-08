import classNames from 'classnames'
import { User } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { Resource } from '@app/web/server/resources/getResource'
import PublishedInInformation from '../PublishedInInformation'
import ResourceContents from './ResourceContents'
import ResourceInformations from './ResourceInformations'
import ResourceNavigation from './ResourceNavigation'
import ResourcePublicStateBadge from './ResourcePublicStateBadge'
import styles from './View.module.css'

const View = ({
  resource,
  user,
}: {
  resource: Resource
  user: User | null
}) => (
  <>
    <div className="fr-grid-row">
      <div className="fr-col-12 fr-col-lg-8">
        <PublishedInInformation resource={resource} />
      </div>
      <div className={styles.headerSeparator}>
        <hr />
      </div>
      <div className="fr-col-12 fr-col-offset-lg-1 fr-col-lg-3">
        {user ? (
          <ResourcePublicStateBadge isPublic={resource.isPublic} />
        ) : (
          <p className={classNames('fr-text--xs', 'fr-mb-0', styles.user)}>
            Créé par{' '}
            <Link href="/" className="fr-text--xs fr-link">
              {resource.createdBy.name}
            </Link>
          </p>
        )}
      </div>
    </div>

    <div className="fr-grid-row fr-mt-4v">
      <div className="fr-col-12 fr-col-lg-8">
        <hr />
      </div>
      <div className="fr-col-0 fr-col-offset-lg-1 fr-col-lg-3">
        <hr />
      </div>
    </div>

    <div className="fr-grid-row" style={{ flexDirection: 'row-reverse' }}>
      <div className="fr-col-12 fr-col-offset-lg-1 fr-col-lg-3">
        <ResourceNavigation resource={resource} user={user} />
      </div>
      <div className="fr-col-12 fr-col-lg-8" id="contents-container">
        <div id="contenu">
          <ResourceContents resource={resource} />
        </div>
        <ResourceInformations />
      </div>
    </div>
  </>
)

export default View
