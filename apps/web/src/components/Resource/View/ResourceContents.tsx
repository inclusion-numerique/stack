import React from 'react'
import classNames from 'classnames'
import ResourceContentView from '@app/web/components/Resource/Contents/ResourceContentView'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/View/ResourcesViewsAndMetadata'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { Resource } from '@app/web/server/resources/getResource'
import RegisterResourceView from '@app/web/components/Resource/View/RegisterResourceView'
import ResourceActions from '@app/web/components/Resource/View/ResourceActions'
import { SessionUser } from '@app/web/auth/sessionUser'
import ResourceMobileNavigation from '@app/web/components/Resource/View/ResourceMobileNavigation'
import type { ResourceNavigationData } from '@app/web/components/Resource/View/getResourceNavigationData'
import { WithAnchorIdAndHref } from '@app/web/components/Resource/View/addAnchorIdsToResourceContents'
import styles from './ResourceContents.module.css'

const ResourceContents = ({
  resource,
  user,
  isAdmin,
  navigationData,
  contentsWithAnchor,
}: {
  resource: Resource
  user: SessionUser | null
  isAdmin: boolean
  navigationData: ResourceNavigationData
  contentsWithAnchor: WithAnchorIdAndHref<Resource['contents'][number]>[]
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
    <ResourceMobileNavigation navigationData={navigationData} />
    {contentsWithAnchor.map((content, index) => (
      <div
        key={content.id}
        id={content.anchorId}
        className={classNames('fr-py-4v', index === 0 && 'fr-pt-6v')}
      >
        <ResourceContentView content={content} />
      </div>
    ))}
    <RegisterResourceView resourceSlug={resource.slug} />
  </>
)

export default ResourceContents
