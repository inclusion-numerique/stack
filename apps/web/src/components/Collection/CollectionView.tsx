import React from 'react'
import { CollectionPageData } from '@app/web/server/collections/getCollection'
import { SessionUser } from '@app/web/auth/sessionUser'
import { WithMinimalImageData } from '@app/web/server/image/imageTypes'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import DeleteResource from '@app/web/components/Resource/DeleteResource/DeleteResource'
import Images from '@app/web/components/Collection/Images'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import SaveCollectionModal from '@app/web/components/Collection/SaveCollectionModal'
import CollectionMetaData from '@app/web/components/Collection/CollectionMetaData'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import styles from './CollectionView.module.css'

const CollectionView = ({
  collection,
  user,
  isOwner,
}: {
  collection: Omit<CollectionPageData, 'image'> & WithMinimalImageData
  user: SessionUser | null
  isOwner: boolean
}) => (
  <div className="fr-width-full">
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
              __html: collection.description,
            }}
          />
        )}
      </div>
    </div>
    <hr className="fr-mt-4w fr-pb-1v" />
    <CollectionMetaData
      user={user}
      collection={collection}
      count={collection.resources.length}
      isOwner={isOwner}
      priority="secondary"
      context="view"
    />
    {collection.resources.map(({ resource }) => (
      <ResourceCard key={resource.id} resource={resource} user={user} />
    ))}
    {!!user && <SaveResourceInCollectionModal user={user} />}
    {!!user && <SaveCollectionModal user={user} />}
    {!!user && <DeleteResource />}
  </div>
)

export default CollectionView
