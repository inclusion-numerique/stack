'use client'

import React, { useState } from 'react'
import classNames from 'classnames'
import { numberToString } from '@app/web/utils/formatNumber'
import type { StatisticData as StatisticType } from '@app/web/app/(prefet)/prefet/[codeDepartement]/getDepartementDashboardData'
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
              {/* Conditional class name makes the icon flicker, we try using visibility instead */}
              <span
                className={classNames(
                  'fr-icon--sm',
                  'fr-icon-arrow-up-s-line',
                  !open && 'fr-hidden',
                )}
              />
              <span
                className={classNames(
                  'fr-icon--sm',
                  'fr-icon-arrow-down-s-line',
                  open && 'fr-hidden',
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
          {numberToString(value)}
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
