import React from 'react'
import { CollectionPageData } from '@app/web/server/collections/getCollection'
import { SessionUser } from '@app/web/auth/sessionUser'
import { WithMinimalImageData } from '@app/web/server/image/imageTypes'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import DeleteResourceModal from '@app/web/components/Resource/DeleteResource/DeleteResourceModal'
import Images, { HeartIconSvg } from '@app/web/components/Collection/Images'
import SaveCollectionModal from '@app/web/components/Collection/SaveCollectionModal'
import CollectionMetaData from '@app/web/components/Collection/CollectionMetaData'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import {
  resourceAuthorization,
  ResourceRoles,
} from '@app/web/authorization/models/resourceAuthorization'
import DeleteCollectionModal from '@app/web/components/Collection/DeleteCollection/DeleteCollectionModal'
import EmptyBaseCollections from '@app/web/components/Base/EmptyBaseCollections'
import CollectionActions from '@app/web/components/Collection/CollectionActions'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import styles from './CollectionView.module.css'

const CollectionView = ({
  collection,
  user,
  isOwner = false,
}: {
  collection: Omit<CollectionPageData, 'image'> & WithMinimalImageData
  user: SessionUser | null
  isOwner?: boolean
}) => (
  <>
    <div
      className={
        collection.isFavorites
          ? 'fr-background-alt--pink-tuile'
          : 'fr-background-alt--blue-france'
      }
    >
      <div className="fr-container fr-container--medium fr-py-4v fr-pb-md-12v fr-pt-md-10v">
        <div className="fr-width-full">
          <div className="fr-flex fr-direction-column fr-flex-gap-6v">
            {!collection.isFavorites && (
              <OwnershipInformation
                user={collection.createdBy}
                base={collection.base}
                attributionWording="collection"
              />
            )}
            <div className="fr-flex fr-justify-content-space-between fr-flex-gap-4v fr-direction-column fr-direction-md-row-reverse">
              {!!collection.image && (
                <div className={styles.imageContainer}>
                  <Images
                    resources={collection.resources.map(
                      ({ resource }) => resource,
                    )}
                    image={collection.image}
                  />
                </div>
              )}
              <div className="fr-flex fr-flex-gap-2v fr-col-md-8">
                {collection.isFavorites && (
                  <div className="fr-hidden fr-unhidden-md fr-background-contrast--pink-tuile fr-p-8v fr-border-radius--8 fr-flex fr-justify-content-center fr-align-items-center fr-mr-4v">
                    <HeartIconSvg />
                  </div>
                )}
                <div className="fr-flex fr-direction-column fr-justify-content-center">
                  <h1 className="fr-mb-4v fr-h3">{collection.title}</h1>
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div className="fr-border-bottom fr-border--grey">
        <div className="fr-container fr-container--medium fr-my-5v">
          {collection.slug && (
            <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-my-2v">
              <CollectionMetaData
                collection={{
                  title: collection.title,
                  id: collection.id,
                  slug: collection.slug,
                  isFavorites: collection.isFavorites,
                  isPublic: collection.isPublic,
                  created: collection.created,
                  updated: collection.updated,
                }}
                count={collection.resources.length}
                context="view"
              />
              <div className="fr-hidden fr-unhidden-md">
                {!collection.isFavorites && (
                  <CollectionActions
                    collection={collection}
                    isOwner={isOwner}
                    user={user}
                    context="view"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {!collection.isFavorites && (
        <div className="fr-hidden-sm fr-border-bottom fr-border--grey">
          <div className="fr-container fr-container--medium fr-my-5v">
            <CollectionActions
              className="fr-justify-content-space-between"
              collection={collection}
              isOwner={isOwner}
              user={user}
              context="view"
            />
          </div>
        </div>
      )}
      <div className="fr-container fr-container--medium fr-pt-12v">
        {collection.resources.length > 0 ? (
          collection.resources.map(({ resource }, index) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              user={user}
              isContributor={resourceAuthorization(resource, user).hasRole(
                ResourceRoles.ResourceContributor,
              )}
              className={index === 0 ? 'fr-pt-12v' : undefined}
            />
          ))
        ) : (
          <EmptyBaseCollections isOwner={isOwner} />
        )}
      </div>
    </div>
    {!!user && <SaveResourceInCollectionModal user={user} />}
    {!!user && <SaveCollectionModal user={user} />}
    <DeleteResourceModal />
    {!!user && (
      <DeleteCollectionModal redirectTo={`/profile/${user.slug}/collections`} />
    )}
  </>
)

export default CollectionView
