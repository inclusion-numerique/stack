import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import IconInSquare from '@app/web/components/IconInSquare'
import CollectionActions from '@app/web/components/Collection/CollectionActions'
import CollectionMetaData from '../Collection/CollectionMetaData'
import styles from './SaveResourceInCollectionModal.module.css'

const AddOrRemoveResourceFromCollection = ({
  collection,
  resourceId,
  onAdd,
  onRemove,
  disabled,
  loading,
  user,
}: {
  collection: SessionUser['collections'][number]
  resourceId: string
  onAdd: (collectionId: string) => void
  onRemove: (collectionId: string) => void
  loading?: boolean
  disabled?: boolean
  user: SessionUser | null
}) => {
  const isFavoriteCollection = collection.isFavorites
  const iconInSquareProps = {
    iconId: isFavoriteCollection ? 'ri-heart-line' : 'ri-folder-2-line',
    iconClassName: isFavoriteCollection ? styles.favoriteText : undefined,
    background: isFavoriteCollection
      ? 'fr-background-alt--pink-tuile'
      : undefined,
  } as const

  return (
    <div className={styles.container} data-testid="add-in-collection-section">
      <div className="fr-flex fr-flex-gap-4v">
        <IconInSquare {...iconInSquareProps} />
        <div className={styles.content}>
          <b>{collection.title}</b>
          <div className={styles.collections}>
            {collection.slug && (
              <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
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
                  context="card"
                />
                {!collection.isFavorites && (
                  <CollectionActions
                    collection={collection}
                    // todo: remove this once we have a way to check if the user is the owner of the collection
                    canWrite={false}
                    user={user}
                    context="card"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {collection.resources.some(
        (collectionResource) => collectionResource.resourceId === resourceId,
      ) ? (
        <Button
          priority="tertiary"
          onClick={() => onRemove(collection.id)}
          className={loading ? 'fr-btn--loading' : ''}
          disabled={disabled}
          iconPosition="right"
          iconId="fr-icon-check-line"
          type="button"
          nativeButtonProps={{
            tabIndex: 1,
            'data-testid': 'added-in-collection-button',
          }}
        >
          Déjà ajouté
        </Button>
      ) : (
        <Button
          priority="secondary"
          onClick={() => onAdd(collection.id)}
          className={loading ? 'fr-btn--loading' : ''}
          disabled={disabled}
          type="button"
          nativeButtonProps={{
            tabIndex: 1,
            'data-testid': 'add-in-collection-button',
          }}
        >
          Ajouter
        </Button>
      )}
    </div>
  )
}

export default AddOrRemoveResourceFromCollection
