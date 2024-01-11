import React from 'react'
import classNames from 'classnames'
import ResourceContentView from '@app/web/components/Resource/Contents/ResourceContentView'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/View/ResourcesViewsAndMetadata'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { Resource } from '@app/web/server/resources/getResource'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { getResourceSectionIdAttribute } from '@app/web/components/Resource/View/getResourceSectionIdAttribute'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import { getServerUrl } from '@app/web/utils/baseUrl'
import RegisterResourceView from '@app/web/components/Resource/View/RegisterResourceView'
import styles from './ResourceContents.module.css'
import ResourceSideMenu from './ResourceSideMenu'

const PublishedAndUpdated = ({
  className,
  updated,
  created,
}: {
  className?: string
  created: Date
  updated: Date
}) => {
  const publishedDay = dateAsDay(created)
  const updatedDay = dateAsDay(updated)

  return (
    <div className={classNames('fr-text--xs fr-mb-0', className)}>
      <b className="fr-mr-1w">Publiée le {dateAsDay(created)}</b>
      {publishedDay !== updatedDay && (
        <>
          <span className={styles.publishedAndUpdatedSeparator} />
          <span className="fr-ml-1w">
            {publishedDay !== updatedDay && ` Mise à jour le ${updatedDay}`}
          </span>
        </>
      )}
    </div>
  )
}

const ResourceContents = ({ resource }: { resource: Resource }) => (
  <>
    <div className={styles.dateInformations}>
      <PublishedAndUpdated
        created={resource.created}
        updated={resource.updated}
        className="fr-hidden fr-unhidden-lg"
      />
      <div className="fr-hidden fr-unhidden-md">
        <CopyLinkButton
          priority="tertiary"
          url={getServerUrl(`/ressources/${resource.slug}`, true)}
        />
      </div>
    </div>
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
    <PublishedAndUpdated
      created={resource.created}
      updated={resource.updated}
      className={classNames('fr-hidden-lg', !!resource.image && 'fr-mt-4v')}
    />
    <h3 className={classNames('fr-mb-2w', styles.title)}>{resource.title}</h3>
    <p className="fr-text--lg fr-mb-0">{resource.description}</p>
    <hr id="contenu" className="fr-hidden fr-unhidden-md fr-mt-8v" />
    <ResourcesViewsAndMetadata
      resource={resource}
      className={styles.viewsAndMetadata}
    />
    <div className="fr-hidden-md fr-mb-8v">
      <ResourceSideMenu resource={resource} />
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
