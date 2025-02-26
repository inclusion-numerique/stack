import React from 'react'
import classNames from 'classnames'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import Tag from '@codegouvfr/react-dsfr/Tag'
import type { SessionUser, SessionUserBase } from '@app/web/auth/sessionUser'
import BaseImage from '@app/web/components/BaseImage'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import styles from './SaveResourceInCollectionModal.module.css'

const SaveInNestedCollection = ({
  base,
  user,
  onClick,
  alreadyInCollections,
}: {
  base?: SessionUserBase
  user: SessionUser
  onClick: () => void
  alreadyInCollections: number
}) => (
  <button
    className={classNames(styles.clickableContainer, 'fr-border--bottom')}
    onClick={onClick}
    type="button"
    data-testid="add-in-collection-bases"
  >
    <div className={styles.content}>
      <div className="fr-flex fr-flex-gap-4v">
        {!base && <RoundProfileImage user={user} size={56} borderWidth={1} />}
        {!!base && (
          // TODO - handle base image
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          <BaseImage base={base as any} size={56} />
        )}
        <div>
          <b className="fr-text-title--grey">
            {base ? base.title : `${user.name} - Mes collections`}
          </b>
          <div className={classNames('fr-mt-2v', styles.collections)}>
            <span className="fr-icon-folder-2-line fr-icon--sm" />{' '}
            {base ? base.collections.length : user.collections.length}{' '}
            Collections{' '}
            {alreadyInCollections > 0 ? (
              <Tag small>
                Déjà ajoutée dans {alreadyInCollections} collection
                {sPluriel(alreadyInCollections)}
              </Tag>
            ) : null}
          </div>
        </div>
      </div>
    </div>
    <span
      className={classNames(
        'fr-icon-arrow-right-s-line',
        'fr-mx-1w',
        'fr-icon--sm',
        styles.arrow,
      )}
    />
  </button>
)

export default SaveInNestedCollection
