import React from 'react'
import styles from './Statistic.module.css'

type StatisticProps = { value: number; label: string; bold?: boolean }
const Statistic = ({
  value,
  label,
  children,
  bold,
}: StatisticProps & {
  children?:
    | React.ReactElement<StatisticProps>
    | React.ReactElement<StatisticProps>[]
}) => (
  <>
    <div className={styles.statistic}>
      <span className="fr-text--sm fr-mb-0 fr-mr-2w">
        {bold ? <b>{label}</b> : label}
      </span>
      <b>{value}</b>
    </div>
    {children && <div className="fr-ml-3w">{children}</div>}
  </>
)

export default Statistic
