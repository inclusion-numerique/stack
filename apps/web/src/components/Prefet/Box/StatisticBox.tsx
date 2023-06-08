import React from 'react'
import { StatisticBox as StatisticBoxType } from '../data'
import Statistic from './Statistic'
import styles from './StatisticBox.module.css'
import Source from './Source'

const StatisticBox = ({ label, value, statistics }: StatisticBoxType) => (
  <>
    {label && (
      <div className={styles.header}>
        <h3>{value}</h3>
        <h6>{label}</h6>
      </div>
    )}
    {statistics.map((boxStatistic, index, array) => (
      <div key={boxStatistic.id}>
        {'source' in boxStatistic ? (
          <div className={index === array.length - 1 ? '' : 'fr-mb-4w'}>
            <Statistic
              bold
              key={boxStatistic.id}
              label={boxStatistic.label}
              value={boxStatistic.value}
            />
            <Source date={boxStatistic.updated} source={boxStatistic.source} />
          </div>
        ) : (
          <>
            <div className="fr-text--lg fr-mt-3w">
              {boxStatistic.label && <b>{boxStatistic.label}</b>}
            </div>
            {boxStatistic.statistics &&
              boxStatistic.statistics.map((statistic) => (
                <Statistic
                  withMarginBottom={index !== array.length - 1}
                  key={statistic.id}
                  label={statistic.label}
                  value={statistic.value}
                >
                  {statistic.statistics &&
                    statistic.statistics.map((subStatistic) => (
                      <Statistic
                        key={subStatistic.id}
                        label={subStatistic.label}
                        value={subStatistic.value}
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
