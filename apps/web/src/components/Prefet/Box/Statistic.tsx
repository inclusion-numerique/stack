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
  isSubStatistic,
}: StatisticProps & {
  children?:
    | React.ReactElement<StatisticProps>
    | React.ReactElement<StatisticProps>[]
  isSubStatistic?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const displayChildren = children && (!collapsable || open)
  return (
    <>
      <div className={isSubStatistic ? styles.subStatistic : styles.statistic}>
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
                    ? 'fr-icon-arrow-up-s-line'
                    : 'fr-icon-arrow-down-s-line',
                )}
              />
            </button>
          )}
        </span>
        <span
          className={classNames(
            'fr-text--sm fr-mb-0',
            !isSubStatistic && 'fr-text--bold',
          )}
        >
          {value}
        </span>
      </div>
      {displayChildren && (
        <div className={classNames('fr-ml-3w', styles.children)}>
          {children}
        </div>
      )}
    </>
  )
}

export default Statistic
