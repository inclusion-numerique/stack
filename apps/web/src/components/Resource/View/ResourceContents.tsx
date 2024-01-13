import React from 'react'
import classNames from 'classnames'
import ResourceContentView from '@app/web/components/Resource/Contents/ResourceContentView'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/View/ResourcesViewsAndMetadata'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { Resource } from '@app/web/server/resources/getResource'
import { getResourceSectionIdAttribute } from '@app/web/components/Resource/View/getResourceSectionIdAttribute'
import RegisterResourceView from '@app/web/components/Resource/View/RegisterResourceView'
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
    <h3 className="fr-mt-4v fr-mb-0 fr-mt-md-8v">{resource.title}</h3>
    <p className="fr-text--lg fr-mt-2v fr-mt-md-3v fr-mb-0">
      {resource.description}
    </p>
    <ResourcesViewsAndMetadata
      resource={resource}
      className="fr-my-4v fr-my-md-6v"
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
