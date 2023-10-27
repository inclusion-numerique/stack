import React from 'react'
import classNames from 'classnames'
import styles from './Images.module.css'

const EmptyImage = ({
  size,
  position,
}:
  | { size: 'small'; position: 'top' | 'bottom' }
  | { size: 'medium'; position?: undefined }) => (
  <div
    className={classNames(styles.emptyImageContainer, {
      [styles.smallEmptyImage]: size === 'small',
      [styles.mediumEmptyImage]: size === 'medium',
      [styles.topEmptyImage]: position === 'top',
      [styles.bottomEmptyImage]: position === 'bottom',
    })}
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/images/collection-resource.svg" alt="" />
  </div>
)

export default EmptyImage
