import React, { ReactNode } from 'react'
import Link from 'next/link'
import { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import SaveCollectionModal from '@app/web/components/Collection/SaveCollectionModal'
import { SessionUser } from '@app/web/auth/sessionUser'
import CollectionCard from '@app/web/components/Collection/Cards/CollectionCard'
import IconInSquare from '@app/web/components/IconInSquare'
import EmptyBox from '@app/web/components/EmptyBox'
import DeleteCollectionModal from '@app/web/components/Collection/DeleteCollection/DeleteCollectionModal'
import { CreateCollectionButton } from '../CreateCollectionButton'
import styles from './Collections.module.css'

const Collections = ({
  collections,
  savedCollections,
  withCreation,
  collectionsLabel,
  emptyBox,
  baseId,
  user,
}: {
  user: SessionUser | null
  collections: CollectionListItem[]
  savedCollections: CollectionListItem[]
  collectionsLabel: string
  withCreation: boolean
  emptyBox?: ReactNode
  baseId?: string
}) => {
  const favoriteCollection = collections.find((c) => c.isFavorites)
  const otherCollections = collections.filter((c) => !c.isFavorites)

  // Favorite collection does not exist in base collections, so we exclude it
  const combinedCollections = favoriteCollection
    ? [favoriteCollection, ...otherCollections, ...savedCollections]
    : [...otherCollections, ...savedCollections]
  return (
    <div data-testid="collections-list">
      {combinedCollections.length > 0 ? (
        <>
          <div className="fr-grid-row fr-justify-content-space-between fr-direction-sm-row fr-direction-column-reverse fr-mb-4w">
            <div className="fr-col-sm-auto fr-col-12">
              <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
                <IconInSquare iconId="ri-folder-2-line" />
                <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">
                  {collectionsLabel} · {combinedCollections.length}
                </h2>
              </div>
            </div>
            {withCreation && (
              <div className="fr-col-sm-auto fr-col-12 fr-mb-5w fr-mb-md-2w">
                <CreateCollectionButton
                  className="fr-btn--secondary fr-width-full fr-justify-content-center"
                  baseId={baseId}
                />
              </div>
            )}
          </div>
          <div className={styles.tabCards}>
            {combinedCollections.map((collection) => (
              <CollectionCard collection={collection} key={collection.id} />
            ))}
            {combinedCollections.length === 1 && !!favoriteCollection && (
              <EmptyBox className="fr-flex fr-justify-content-center">
                Créez une collection pour enregistrer et organiser des
                ressources.
                <Link href="/centre-d-aide/les-collections" className="fr-link">
                  En savoir plus
                </Link>
                <div className="fr-mt-4w">
                  <CreateCollectionButton />
                </div>
              </EmptyBox>
            )}
          </div>
        </>
      ) : (
        emptyBox
      )}
      {!!user && <SaveCollectionModal user={user} />}
      <DeleteCollectionModal />
    </div>
  )
}

export default Collections
