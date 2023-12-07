import React from 'react'
import sanitizeHtml from 'sanitize-html'
import { CollectionPageData } from '@app/web/server/collections/getCollection'
import { SessionUser } from '@app/web/auth/sessionUser'
import { WithMinimalImageData } from '@app/web/server/image/imageTypes'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import DeleteResource from '@app/web/components/Resource/DeleteResource/DeleteResource'
import Images from '@app/web/components/Collection/Images'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import ResourceCard from '../Resource/Card'
import styles from './View.module.css'
import CollectionMetaData from './CollectionMetaData'

const View = ({
  collection,
  user,
  isOwner,
}: {
  collection: Omit<CollectionPageData, 'image'> & WithMinimalImageData
  user: SessionUser | null
  isOwner: boolean
}) => (
  <div className={styles.container}>
    <div className="fr-mb-4w">
      <OwnershipInformation
        user={collection.owner}
        base={collection.base}
        attributionWording="collection"
      />
    </div>
    <hr className="fr-mt-4w fr-pb-4w" />
    <div className={styles.header}>
      <div className={styles.imageContainer}>
        <Images
          resources={collection.resources.map(({ resource }) => resource)}
          image={collection.image}
        />
      </div>
      <div>
        <h3>{collection.title}</h3>
        {collection.description && (
          <div
            className="fr-text--lg fr-mb-0"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(collection.description),
            }}
          />
        )}
      </div>
    </div>
    <hr className="fr-mt-4w fr-pb-1v" />
    <CollectionMetaData
      collection={collection}
      count={collection.resources.length}
      isOwner={isOwner}
      withButtons
      priority="secondary"
    />
    {collection.resources.map(({ resource }) => (
      <ResourceCard key={resource.id} resource={resource} user={user} />
    ))}
    {!!user && <SaveResourceInCollectionModal user={user} />}
    {!!user && <DeleteResource />}
  </div>
)

export default View
