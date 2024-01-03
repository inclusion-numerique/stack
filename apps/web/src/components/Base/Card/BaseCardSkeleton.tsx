import React from 'react'
import classNames from 'classnames'
import cardStyles from './BaseCard.module.css'
import styles from './BaseCardSkeleton.module.css'

const BaseSkeleton = ({ compact = false }: { compact?: boolean }) => (
  <div
    className={classNames(cardStyles.container, styles.container)}
    data-testid="base-skeleton"
  >
    <span
      className={classNames(
        'skeleton-quarter',
        compact ? 'skeleton--48' : 'skeleton--96',
      )}
    />
    <div className={cardStyles.content}>
      <span>
        <div
          className={classNames('skeleton-rectangle skeleton-rectangle--120')}
        />
        {!compact && (
          <>
            <div className="fr-mt-6v skeleton-rectangle skeleton-rectangle--480" />
            <div className="fr-mb-2w fr-mt-2v skeleton-rectangle skeleton-rectangle--480" />
          </>
        )}
      </span>
      <div className="fr-mt-4v skeleton-rectangle skeleton-rectangle--240" />
    </div>
  </div>
)

export default BaseSkeleton
