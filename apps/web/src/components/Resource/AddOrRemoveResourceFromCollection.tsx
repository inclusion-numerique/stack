import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import CollectionActions from '@app/web/components/Collection/CollectionActions'
import CollectionMetaData from '../Collection/CollectionMetaData'
import styles from './SaveResourceInCollectionModal.module.css'

const AddOrRemoveResourceFromCollection = ({
  user,
  collection,
  resourceId,
  onAdd,
  onRemove,
  disabled,
  loading,
  isOwner = false,
}: {
  user: SessionUser | null
  collection: SessionUser['collections'][number]
  resourceId: string
  onAdd: (collectionId: string) => void
  onRemove: (collectionId: string) => void
  loading?: boolean
  disabled?: boolean
  isOwner?: boolean
}) => (
  <div className={styles.container} data-testid="add-in-collection-section">
    <div className={styles.content}>
      <b>{collection.title}</b>
      <div className={styles.collections}>
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
              context="card"
            />
            {!collection.isFavorites && (
              <CollectionActions
                collection={collection}
                canWrite={isOwner}
                user={user}
                context="card"
              />
            )}
          </div>
        )}
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

export default AddOrRemoveResourceFromCollection
