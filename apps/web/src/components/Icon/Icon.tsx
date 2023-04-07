import React from 'react'
import styles from './Icon.module.css'

const Icon = ({ name }: { name: string }) => (
  <div className={`fr-mr-2v ${styles.container}`}>
    <span className={`fr-icon ${name}`} />
  </div>
)

export default Icon
