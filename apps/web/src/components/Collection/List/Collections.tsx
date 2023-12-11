import React, { ReactNode } from 'react'
import Tabs from '@codegouvfr/react-dsfr/Tabs'
import { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import SaveCollectionModal from '@app/web/components/Collection/SaveCollectionModal'
import { SessionUser } from '@app/web/auth/sessionUser'
import { CreateCollectionButton } from '../CreateCollectionButton'
import CollectionCard from '../CollectionCard'
import styles from './Collections.module.css'

const Collections = ({
  collections,
  savedCollections,
  withCreation,
  withTabs,
  collectionsLabel,
  emptyBox,
  emptySavedBox,
  baseId,
  user,
}: {
  user: SessionUser | null
  collections: CollectionListItem[]
  savedCollections: CollectionListItem[]
  withCreation: boolean
  withTabs: boolean
  collectionsLabel: string
  emptyBox?: ReactNode
  emptySavedBox: ReactNode
  baseId?: string
}) => (
  <div className={styles.container} data-testid="collections-list">
    <div className={styles.header}>
      <h3 className="fr-mb-0">
        Collections · {collections.length + savedCollections.length}
      </h3>
      {withCreation && (
        <CreateCollectionButton className="fr-btn--secondary" baseId={baseId} />
      )}
    </div>

    {withTabs ? (
      <Tabs
        tabs={[
          {
            label: `${collectionsLabel} · ${collections.length}`,
            content:
              collections.length > 0 ? (
                <div className={styles.tabCards}>
                  {collections.map((collection) => (
                    <CollectionCard
                      user={user}
                      collection={collection}
                      key={collection.id}
                    />
                  ))}
                </div>
              ) : (
                emptyBox
              ),
          },
          {
            label: (
              <>
                <span className="ri-bookmark-3-line fr-text--regular fr-mr-1w" />
                Collections enregistrées · {savedCollections.length}
              </>
            ),
            content:
              savedCollections.length > 0 ? (
                <div className={styles.tabCards}>
                  {savedCollections.map((collection) => (
                    <CollectionCard
                      user={user}
                      collection={collection}
                      key={collection.id}
                    />
                  ))}
                </div>
              ) : (
                emptySavedBox
              ),
          },
        ]}
      />
    ) : (
      <div className={styles.cards}>
        {collections.map((collection) => (
          <CollectionCard
            user={user}
            collection={collection}
            key={collection.id}
          />
        ))}
      </div>
    )}
    {!!user && <SaveCollectionModal user={user} />}
  </div>
)

export default Collections
