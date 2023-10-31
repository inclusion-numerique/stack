import React from 'react'
import classNames from 'classnames'
import type { SessionUser, SessionUserBase } from '@app/web/auth/sessionUser'
import styles from './SaveResourceInCollectionModal.module.css'

const SaveInNestedCollection = ({
  base,
  user,
  onClick,
}: {
  base?: SessionUserBase
  user: SessionUser
  onClick: () => void
}) => (
  <button
    className={styles.clickableContainer}
    onClick={onClick}
    type="button"
    data-testid="add-in-collection-bases"
  >
    <div className={styles.content}>
      <b className="fr-text-title--grey">
        {base ? base.title : `${user.name} - Mes collections`}
      </b>
      <div className={classNames('fr-mt-2v', styles.collections)}>
        <span className="fr-icon-folder-2-line fr-icon--sm" />{' '}
        {base ? base.collections.length : user.collections.length} Collections
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
