'use client'

import React, { useState } from 'react'
import classNames from 'classnames'
import { Statistic as StatisticType } from '../departementData'
import styles from './Statistic.module.css'

type StatisticProps = {
  bold?: boolean
} & StatisticType

const Statistic = ({
  value,
  label,
  children,
  collapsable,
  bold,
  withMarginBottom,
}: StatisticProps & {
  children?:
    | React.ReactElement<StatisticProps>
    | React.ReactElement<StatisticProps>[]
  withMarginBottom?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const displayChildren = children && (!collapsable || open)
  return (
    <>
      <div
        className={classNames(styles.statistic, {
          [styles.marginBottom]: withMarginBottom && !displayChildren,
        })}
      >
        <span className="fr-text--sm fr-mb-0 fr-mr-2w">
          {bold ? <b>{label}</b> : label}
          {collapsable && (
            <button
              type="button"
              title={open ? 'Fermer le détail' : 'Ouvrir le détail'}
              onClick={() => setOpen(!open)}
              className={styles.collapseButton}
            >
              <span
                className={classNames(
                  'fr-icon--sm',
                  open
                    ? 'fr-icon-arrow-down-s-line'
                    : 'fr-icon-arrow-up-s-line',
                )}
              />
            </button>
          )}
        </span>
        <b className="fr-text--sm fr-mb-0">{value}</b>
      </div>
      {displayChildren && <div className="fr-ml-3w">{children}</div>}
    </>
  )
}

export default Statistic
