import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
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
  isOwner,
}: {
  user: SessionUser | null
  collection: SessionUser['collections'][number]
  resourceId: string
  onAdd: (collectionId: string) => void
  onRemove: (collectionId: string) => void
  loading?: boolean
  disabled?: boolean
  isOwner: boolean
}) => (
  <div className={styles.container} data-testid="add-in-collection-section">
    <div className={styles.content}>
      <b>{collection.title}</b>
      <div className={styles.collections}>
        {collection.slug && (
          <CollectionMetaData
            isOwner={isOwner}
            user={user}
            collection={{
              title: collection.title,
              id: collection.id,
              slug: collection.slug,
              isFavorites: collection.isFavorites,
              isPublic: collection.isPublic,
            }}
            count={collection.resources.length}
            context="collectionModal"
          />
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
