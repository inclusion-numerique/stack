import classNames from 'classnames'
import React from 'react'
import styles from './Separator.module.css'

const Separator = ({ className }: { className?: string }) => (
  <div className={classNames(styles.separator, className)} />
)

export default Separator
