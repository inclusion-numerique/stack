import React from 'react'
import classNames from 'classnames'
import cardStyles from './Card.module.css'
import styles from './Skeleton.module.css'

const ProfileSkeleton = () => (
  <div
    className={classNames(cardStyles.container, styles.container)}
    data-testid="profile-skeleton"
  >
    <div className={cardStyles.content}>
      <div className="skeleton-round skeleton-round--48" />
      <div className="fr-width-full">
        <div className="skeleton-rectangle skeleton-rectangle--120" />
        <div className="fr-mt-4v skeleton-rectangle skeleton-rectangle--240" />
      </div>
    </div>
  </div>
)

export default ProfileSkeleton
