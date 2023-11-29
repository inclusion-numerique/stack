import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import CollectionMetaData from '../Collection/CollectionMetaData'
import styles from './SaveResourceInCollectionModal.module.css'

const AddOrRemoveResourceFromCollection = ({
  collection,
  resourceId,
  onAdd,
  onRemove,
  disabled,
  loading,
}: {
  collection: SessionUser['collections'][number]
  resourceId: string
  onAdd: (collectionId: string) => void
  onRemove: (collectionId: string) => void
  loading?: boolean
  disabled?: boolean
}) => (
  <div className={styles.container} data-testid="add-in-collection-section">
    <div className={styles.content}>
      <b>{collection.title}</b>
      <div className={styles.collections}>
        <CollectionMetaData
          collection={collection}
          count={collection.resources.length}
        />
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
        nativeButtonProps={{
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
        nativeButtonProps={{
          'data-testid': 'add-in-collection-button',
        }}
      >
        Ajouter
      </Button>
    )}
  </div>
)

export default AddOrRemoveResourceFromCollection