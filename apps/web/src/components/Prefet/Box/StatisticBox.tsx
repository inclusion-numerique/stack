import React from 'react'
import classNames from 'classnames'
import { numberToString } from '@app/web/utils/formatNumber'
import type { StatisticBoxData } from '@app/web/app/(private)/tableau-de-bord/departement/[codeDepartement]/getDepartementDashboardData'
import Statistic from './Statistic'
import styles from './StatisticBox.module.css'
import Source from './Source'

const StatisticBox = ({
  label,
  value,
  statistics,
  withDescription,
}: StatisticBoxData) => (
  <>
    {label && (
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h3>{numberToString(value)}</h3>
          <h6>{label}</h6>
        </div>
        {withDescription && (
          <span
            className={classNames(
              'fr-hint-text',
              'fr-text--xs',
              'fr-mb-0',
              styles.headerDescription,
            )}
          >
            Recensés sur&nbsp;
            <a href="/" target="_blank" rel="noopener noreferrer">
              La Cartographie Nationale
            </a>
          </span>
        )}
      </div>
    )}
    {statistics.map((boxStatistic, index, array) => (
      <div key={boxStatistic.id}>
        {'source' in boxStatistic ? (
          <div className={index === array.length - 1 ? '' : 'fr-mb-4w'}>
            <Statistic bold {...boxStatistic} />
            <Source date={boxStatistic.updated} source={boxStatistic.source} />
          </div>
        ) : (
          <>
            <p className="fr-text--lg fr-mt-3w fr-mb-2w fr-text--bold">
              {boxStatistic.label}
            </p>
            {boxStatistic.statistics &&
              boxStatistic.statistics.map((statistic) => (
                <Statistic key={statistic.id} {...statistic}>
                  {statistic.statistics &&
                    statistic.statistics.map((subStatistic) => (
                      <Statistic
                        key={subStatistic.id}
                        {...subStatistic}
                        isSubStatistic
                      />
                    ))}
                </Statistic>
              ))}
          </>
        )}
      </div>
    ))}
  </>
)

export default StatisticBox
