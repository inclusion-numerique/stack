'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import type { SessionUser, SessionUserBase } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { getBasesFromSessionUser } from '@app/web/bases/getBasesFromSessionUser'
import { createCollectionUrl } from '@app/web/collections/createCollectionUrl'
import AddOrRemoveResourceFromCollection from './AddOrRemoveResourceFromCollection'
import SaveInNestedCollection from './SaveInNestedCollection'
import styles from './SaveResourceInCollectionModal.module.css'

export const SaveResourceInCollectionDynamicModal = createDynamicModal({
  id: 'save-resource-in-collection',
  isOpenedByDefault: false,
  initialState: {
    resourceId: null as string | null,
  },
})

const SaveResourceInCollectionModal = ({ user }: { user: SessionUser }) => {
  const { resourceId } = SaveResourceInCollectionDynamicModal.useState()

  const router = useRouter()

  const bases = getBasesFromSessionUser(user)

  const [pendingMutationCollectionId, setPendingMutationCollectionId] =
    useState<string | null>(null)

  // "profil" or the base id of the nested collections selection
  const [nested, setNested] = useState<null | string>(null)

  // If nested is set to a base id, this is the selected base id
  const selectedBase = useMemo<SessionUserBase | undefined>(
    () => (nested ? bases.find((base) => base.id === nested) : undefined),
    [bases, nested],
  )

  const addMutation = trpc.resource.addToCollection.useMutation()
  const removeMutation = trpc.resource.removeFromCollection.useMutation()
  const onAdd = async (collectionId: string) => {
    if (!resourceId) {
      return
    }
    setPendingMutationCollectionId(collectionId)
    try {
      await addMutation.mutateAsync({
        resourceId,
        collectionId,
      })
      setPendingMutationCollectionId(null)
      router.refresh()
    } catch (error) {
      // TODO Sentry + toast ?
      console.error(error)
      throw error
    }
  }

  const onRemove = async (collectionId: string) => {
    if (!resourceId) {
      return
    }
    setPendingMutationCollectionId(collectionId)
    try {
      await removeMutation.mutateAsync({
        resourceId,
        collectionId,
      })
      setPendingMutationCollectionId(null)

      router.refresh()
    } catch (error) {
      // TODO Sentry + toast ?
      console.error(error)
      throw error
    }
  }

  const showCreateCollectionButton = bases.length === 0 || !!nested

  return (
    <SaveResourceInCollectionDynamicModal.Component
      className={styles.modal}
      title="Ajouter à une collection"
      buttons={
        showCreateCollectionButton
          ? [
              {
                children: 'Créer une collection',
                iconId: 'fr-icon-add-line',
                priority: 'secondary',
                className: styles.createCollectionButton,
                linkProps: {
                  href: createCollectionUrl({ baseId: selectedBase?.id }),
                },
              },
            ]
          : undefined
      }
    >
      {nested && (
        <button
          type="button"
          className={classNames(
            styles.clickableContainer,
            styles.backToBasesButton,
          )}
          onClick={() => setNested('')}
          data-testid="back-to-bases-button"
        >
          <div>
            <span
              className={classNames(
                'fr-icon-arrow-left-s-line',
                'fr-icon--sm',
                'fr-mx-1w',
                styles.arrow,
              )}
            />
            <b className="fr-text-title--grey fr-ml-1w">
              {selectedBase
                ? selectedBase.title
                : `${user.name} - Mes collections`}
            </b>
          </div>
        </button>
      )}
      {addMutation.error && (
        <p
          className="fr-error-text"
          data-testid="save-resource-in-collection-error"
        >
          {addMutation.error.message}
        </p>
      )}
      {!!resourceId &&
        (nested === 'profil' || (!nested && bases.length === 0) ? (
          <>
            {user.collections.map((collection) => (
              <AddOrRemoveResourceFromCollection
                loading={pendingMutationCollectionId === collection.id}
                key={collection.id}
                collection={collection}
                resourceId={resourceId}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            ))}
          </>
        ) : selectedBase ? (
          selectedBase.collections.length > 0 ? (
            selectedBase.collections.map((collection) => (
              <AddOrRemoveResourceFromCollection
                loading={pendingMutationCollectionId === collection.id}
                key={collection.id}
                collection={collection}
                resourceId={resourceId}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            ))
          ) : (
            <div
              className={styles.emptyBase}
              data-testid="base-without-collection"
            >
              Vous n&lsquo;avez pas de collection dans votre base
            </div>
          )
        ) : (
          <>
            <SaveInNestedCollection
              user={user}
              onClick={() => setNested('profil')}
            />
            {bases.map((base) => (
              <SaveInNestedCollection
                key={base.id}
                user={user}
                base={base}
                onClick={() => setNested(base.id)}
              />
            ))}
          </>
        ))}
    </SaveResourceInCollectionDynamicModal.Component>
  )
}

export default withTrpc(SaveResourceInCollectionModal)
