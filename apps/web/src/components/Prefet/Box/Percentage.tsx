import React from 'react'
import styles from './Statistic.module.css'

type PercentageProps = {
  color: string
  value: number
  label: string
}
const Percentage = ({ value, label, color }: PercentageProps) => (
  <div className={styles.statistic}>
    <div className={styles.label}>
      <div className={styles.circle} style={{ backgroundColor: color }} />
      <span className="fr-text--sm fr-mb-0 fr-mr-2w">{label}</span>
    </div>
    <b className="fr-text--sm fr-mb-0">{value}%</b>
  </div>
)

export default Percentage
