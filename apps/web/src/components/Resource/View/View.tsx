import React from 'react'
import classNames from 'classnames'
import { Resource } from '@app/web/server/resources/getResource'
import { hasIndexation } from '@app/web/utils/indexation'
import { SessionUser } from '@app/web/auth/sessionUser'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import ResourceContents from './ResourceContents'
import ResourceInformations from './ResourceInformations'
import ResourceNavigation from './ResourceNavigation'
import ViewHeader from './ViewHeader'
import ViewSeparators from './ViewSeparators'
import styles from './View.module.css'

const View = ({
  resource,
  user,
  isAdmin,
}: {
  resource: Resource
  user: SessionUser | null
  isAdmin: boolean
}) => (
  <div className={styles.container} data-testid="resource-view">
    <ViewHeader resource={resource} isAdmin={isAdmin} />
    <ViewSeparators />

    <div className="fr-grid-row" style={{ flexDirection: 'row-reverse' }}>
      <div className={classNames(styles.rightColumn)}>
        <ResourceNavigation user={user} resource={resource} isAdmin={isAdmin} />
      </div>
      <div className={classNames(styles.leftColumn)} id="contents-container">
        <ResourceContents resource={resource} userId={user?.id} />
        {(resource.isPublic || hasIndexation(resource)) && (
          <ResourceInformations resource={resource} />
        )}
      </div>
    </div>
    {!!user && <SaveResourceInCollectionModal user={user} />}
  </div>
)

export default View
