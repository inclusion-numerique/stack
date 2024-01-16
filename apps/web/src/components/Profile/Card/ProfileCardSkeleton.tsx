import React from 'react'
import cardStyles from './ProfileCard.module.css'

const ProfileCardSkeleton = () => (
  <article className={cardStyles.container} data-testid="profile-skeleton">
    <div className={cardStyles.content}>
      <div className="skeleton-quarter skeleton--48 fr-mr-1w" />
      <div className="fr-width-full">
        <div className="skeleton-rectangle skeleton-rectangle--120" />
        <div className="fr-mt-2v skeleton-rectangle skeleton-rectangle--240" />
      </div>
    </div>
  </article>
)

export default ProfileCardSkeleton
