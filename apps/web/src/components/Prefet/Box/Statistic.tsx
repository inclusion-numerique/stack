import React from 'react'
import classNames from 'classnames'
import styles from './Statistic.module.css'

type StatisticProps = {
  value: number
  label: string
  bold?: boolean
}
const Statistic = ({
  value,
  label,
  children,
  bold,
  withMarginBottom,
}: StatisticProps & {
  children?:
    | React.ReactElement<StatisticProps>
    | React.ReactElement<StatisticProps>[]
  withMarginBottom?: boolean
}) => (
  <>
    <div
      className={classNames(styles.statistic, {
        [styles.marginBottom]: withMarginBottom,
      })}
    >
      <span className="fr-text--sm fr-mb-0 fr-mr-2w">
        {bold ? <b>{label}</b> : label}
      </span>
      <b className="fr-text--sm fr-mb-0">{value}</b>
    </div>
    {children && <div className="fr-ml-3w">{children}</div>}
  </>
)

export default Statistic
