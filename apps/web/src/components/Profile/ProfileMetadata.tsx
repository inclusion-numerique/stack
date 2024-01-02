import classNames from 'classnames'
import React from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import styles from './ProfileMetadata.module.css'

const ProfileMetadata = ({
  resourcesCount,
  followedByCount,
}: {
  resourcesCount: number
  followedByCount: number
}) => (
  <div className={classNames(styles.container, 'fr-text--sm')}>
    <span className="fr-icon-file-text-line fr-icon--sm" />
    <div>
      <b>{resourcesCount}</b>
      <span className={styles.spanMdDisplay}>
        {' '}
        Ressource{sPluriel(resourcesCount)}
      </span>
    </div>
    <div>·</div>
    <span className="fr-icon-user-heart-line fr-icon--sm" />
    <div>
      <b>{followedByCount}</b>
      <span className={styles.spanMdDisplay}>
        {' '}
        Suivi{sPluriel(followedByCount)}
      </span>
    </div>
  </div>
)
export default ProfileMetadata
