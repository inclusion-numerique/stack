import React from 'react'
import classNames from 'classnames'
import cardStyles from './ResourceCard.module.css'
import styles from './ResourceCardSkeleton.module.css'

const ResourceSkeleton = () => (
  <div
    className={classNames(cardStyles.container, styles.container)}
    data-testid="resource-skeleton"
  >
    <div className={styles.header}>
      <span className="skeleton-round skeleton--32" />
      <span className="skeleton-rectangle skeleton-rectangle--120 fr-ml-1w" />
    </div>
    <div className={classNames(cardStyles.content, styles.content)}>
      <div className={cardStyles.textAndDescription}>
        <div
          className={classNames(
            'fr-mb-3v skeleton-rectangle skeleton-rectangle--480',
          )}
        />
        <div
          className={classNames(
            'fr-mb-3v skeleton-rectangle skeleton-rectangle--400',
          )}
        />
        <div
          className={classNames('skeleton-rectangle skeleton-rectangle--400')}
        />
      </div>
      <div
        className={classNames(
          cardStyles.imageContainer,
          styles.imageContainer,
          'skeleton-background',
        )}
      />
    </div>
    <div className={classNames(cardStyles.footer, styles.footer)}>
      <span className="skeleton-rectangle skeleton-rectangle--240" />
    </div>
  </div>
)

export default ResourceSkeleton
