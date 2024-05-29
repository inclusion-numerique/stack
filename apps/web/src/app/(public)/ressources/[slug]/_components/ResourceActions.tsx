import React from 'react'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import { Resource } from '@app/web/server/resources/getResource'
import SaveResourceInCollectionButton from '@app/web/components/Resource/SaveResourceInCollectionButton'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import { getServerUrl } from '@app/web/utils/baseUrl'
import DeleteResourceButton from '@app/web/components/Resource/DeleteResourceButton'
import ResourceReportButton from './ResourceReportButton'
import styles from './ResourceActions.module.css'

const ResourceActions = ({
  resource,
  user,
  canDelete,
  canWrite,
}: {
  resource: Resource
  user: SessionUser | null
  canWrite: boolean
  canDelete: boolean
}) => {
  const isPublished = !!resource.published

  return (
    <div className={styles.container}>
      <div>
        {canWrite && (
          <Button
            size="small"
            data-testid="resource-edition-button"
            priority="secondary"
            iconId="fr-icon-edit-line"
            linkProps={{
              href: `/ressources/${resource.slug}/editer`,
            }}
          >
            Modifier
          </Button>
        )}
        {isPublished && (
          <>
            <SaveResourceInCollectionButton
              size="small"
              resource={resource}
              user={user}
              data-testid="save-resource-in-collection-button"
            />
            <CopyLinkButton
              size="small"
              priority="secondary"
              url={getServerUrl(`/ressources/${resource.slug}`, true)}
            />
          </>
        )}
      </div>
      <div>
        {!isPublished && canDelete && (
          <DeleteResourceButton resourceId={resource.id} variant="icon-only" />
        )}
        {isPublished && (
          <>
            {(!canWrite || resource._count.resourceFeedback > 0) && (
              <Link
                className="fr-btn fr-btn--secondary fr-btn--sm"
                href={`/ressources/${resource.slug}/avis`}
              >
                <span className="ri-emotion-line fr-mr-1w" aria-hidden />
                {canWrite ? 'Voir les avis' : 'Donner son avis'}
              </Link>
            )}

            {user && <ResourceReportButton size="small" variant="icon-only" />}
          </>
        )}
      </div>
    </div>
  )
}

export default ResourceActions
