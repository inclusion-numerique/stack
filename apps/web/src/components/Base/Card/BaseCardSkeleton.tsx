import React from 'react'
import classNames from 'classnames'
import cardStyles from './BaseCard.module.css'
import styles from './BaseCardSkeleton.module.css'

const BaseSkeleton = () => (
  <div
    className={classNames(cardStyles.container, styles.container)}
    data-testid="base-skeleton"
  >
    <span className="skeleton-round skeleton-round--116" />
    <div className={cardStyles.content}>
      <span>
        <div className={styles.header}>
          <div
            className={classNames('skeleton-rectangle skeleton-rectangle--120')}
          />
        </div>
        <div className="fr-mb-2w fr-mt-6v skeleton-rectangle skeleton-rectangle--480" />
      </span>
      <div className={styles.footer}>
        <div className="skeleton-rectangle skeleton-rectangle--240" />
      </div>
    </div>
  </div>
)

export default BaseSkeleton
