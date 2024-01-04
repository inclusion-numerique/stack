import React from 'react'
import classNames from 'classnames'
import cardStyles from './ProfileCard.module.css'

const ProfileCardSkeleton = () => (
  <div
    className={classNames(cardStyles.container)}
    data-testid="profile-skeleton"
  >
    <div className={cardStyles.content}>
      <div className="skeleton-round skeleton--48" />
      <div className="fr-width-full">
        <div className="skeleton-rectangle skeleton-rectangle--120" />
        <div className="fr-mt-2v skeleton-rectangle skeleton-rectangle--240" />
      </div>
    </div>
  </div>
)

export default ProfileCardSkeleton
