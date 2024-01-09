import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { Resource } from '@app/web/server/resources/getResource'
import { FilteredResource } from '@app/web/server/resources/authorization'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import ResourcePublicStateBadge from './ResourcePublicStateBadge'
import styles from './ResourceView.module.css'

const ResourceViewHeader = ({
  resource,
  isAdmin,
}: {
  resource: Resource | FilteredResource
  isAdmin?: boolean
}) => (
  <div className="fr-grid-row">
    <div className={classNames(styles.leftColumn)}>
      <OwnershipInformation
        user={resource.createdBy}
        base={resource.base}
        attributionWording="resource"
      />
    </div>
    <div className={styles.headerSeparator}>
      <hr />
    </div>
    <div
      className={classNames(styles.rightColumn)}
      data-testid="resource-public-state-badge"
    >
      {isAdmin ? (
        <ResourcePublicStateBadge isPublic={resource.isPublic} />
      ) : (
        <p className={classNames('fr-text--xs', 'fr-mb-0', styles.user)}>
          Créé par{' '}
          <Link
            href={`/profils/${resource.createdBy.slug}`}
            className="fr-text--xs fr-link"
          >
            {resource.createdBy.name}
          </Link>
        </p>
      )}
    </div>
  </div>
)

export default ResourceViewHeader
