import React from 'react'
import classNames from 'classnames'
import ResourceContentView from '@app/web/components/Resource/Contents/ResourceContentView'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/View/ResourcesViewsAndMetadata'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { Resource } from '@app/web/server/resources/getResource'
import { getResourceSectionIdAttribute } from '@app/web/components/Resource/View/getResourceSectionIdAttribute'
import RegisterResourceView from '@app/web/components/Resource/View/RegisterResourceView'
import ResourceDates from '@app/web/components/Resource/View/ResourceDates'
import ResourceActions from '@app/web/components/Resource/View/ResourceActions'
import { SessionUser } from '@app/web/auth/sessionUser'
import ResourceMobileNavigation from '@app/web/components/Resource/View/ResourceMobileNavigation'
import styles from './ResourceContents.module.css'

const ResourceContents = ({
  resource,
  user,
  isAdmin,
}: {
  resource: Resource
  user: SessionUser | null
  isAdmin: boolean
}) => (
  <>
    {resource.image ? (
      <div className={styles.imageContainer}>
        <ResponsiveUploadedImage
          id={resource.image.id}
          alt={resource.image.altText ?? ''}
          breakpoints={[
            { media: '(max-width: 320px)', width: 320 - 32 },
            { media: '(max-width: 576px)', width: 576 - 32 },
            { media: '(max-width: 768px)', width: 768 - 32 },
            { media: '(min-width: 768px)', width: 588 },
          ]}
        />
      </div>
    ) : null}
    <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-mb-6v">
      <ResourceDates
        created={resource.created}
        updated={resource.updated}
        className={classNames('fr-hidden-lg', !!resource.image && 'fr-mt-4v')}
      />
    </div>
    <h3 className={classNames('fr-mb-2w', styles.title)}>{resource.title}</h3>
    <p className="fr-text--lg fr-mb-0">{resource.description}</p>
    <ResourcesViewsAndMetadata
      resource={resource}
      className={classNames(styles.viewsAndMetadata, 'fr-mt-6v')}
    />
    <ResourceActions resource={resource} user={user} isAdmin={isAdmin} />
    <div className="fr-hidden-md fr-mb-0">
      <ResourceMobileNavigation resource={resource} />
    </div>
    {resource.contents.map((content, index) => (
      <div
        key={content.id}
        id={`${getResourceSectionIdAttribute(content, index)}`}
        className={classNames(styles.content, index === 0 && 'is-first')}
      >
        <ResourceContentView content={content} />
      </div>
    ))}
    <RegisterResourceView resourceSlug={resource.slug} />
  </>
)

export default ResourceContents
