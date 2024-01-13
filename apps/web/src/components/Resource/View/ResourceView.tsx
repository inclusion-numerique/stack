import React from 'react'
import { Resource } from '@app/web/server/resources/getResource'
import { hasIndexation } from '@app/web/utils/indexation'
import { SessionUser } from '@app/web/auth/sessionUser'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import ResourceReport from '@app/web/components/Resource/View/ResourceReport'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import ResourceDates from '@app/web/components/Resource/View/ResourceDates'
import ResourcePublicStateBadge from '@app/web/components/Resource/View/ResourcePublicStateBadge'
import ResourceDesktopNavigation from '@app/web/components/Resource/View/ResourceDesktopNavigation'
import ResourceContents from './ResourceContents'
import ResourceInformations from './ResourceInformations'
import styles from './ResourceView.module.css'

const ResourceView = ({
  resource,
  user,
  isAdmin,
}: {
  resource: Resource
  user: SessionUser | null
  isAdmin: boolean
}) => (
  <div className="fr-grid-row fr-pb-20v" data-testid="resource-view">
    <div className="fr-col-12 fr-col-md-4 fr-col-lg-3 fr-hidden fr-unhidden-md">
      <div className={styles.leftColumn}>
        <ResourceDesktopNavigation resource={resource} />
      </div>
    </div>
    <div className="fr-col-12 fr-col-md-7 fr-col-md-6 fr-pb-20v">
      <div className={styles.contentColumn}>
        <OwnershipInformation
          user={resource.createdBy}
          base={resource.base}
          attributionWording="resource"
        />
        <hr className="fr-separator-4v fr-separator-md-6v" />
        <div className="fr-flex fr-direction-column fr-direction-md-row fr-justify-content-space-between fr-align-items-start fr-align-items-md-center fr-flex-gap-3v fr-mb-4v fr-mb-md-6v">
          <ResourceDates
            created={resource.created}
            updated={resource.updated}
          />
          {isAdmin && (
            <ResourcePublicStateBadge small isPublic={resource.isPublic} />
          )}
        </div>
        <ResourceContents resource={resource} user={user} isAdmin={isAdmin} />
        {(resource.isPublic || hasIndexation(resource)) && (
          <ResourceInformations resource={resource} />
        )}
      </div>
      {!!user && <SaveResourceInCollectionModal user={user} />}
      <ResourceReport resourceId={resource.id} />
    </div>
  </div>
)

export default ResourceView
