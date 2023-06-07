import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import styles from './StatisticsBloc.module.css'
import Statistic from './Statistic'
import { Bloc } from './data'

const StatisticsBloc = ({
  label,
  value,
  statistics,
  className,
}: Bloc & {
  className?: string
}) => (
  <div className={classNames(className, styles.bloc)}>
    {label && (
      <div className={styles.header}>
        <h3>{label}</h3>
        <h6>{value}</h6>
      </div>
    )}
    {statistics.map((blocStatistic, index, array) => (
      <div key={blocStatistic.id}>
        {blocStatistic.source ? (
          <div className={index === array.length - 1 ? '' : 'fr-mb-2w'}>
            <Statistic
              bold
              key={blocStatistic.id}
              label={blocStatistic.label}
              value={blocStatistic.value}
            />
            <p className="fr-text--xs fr-mb-0 fr-mt-1w">
              Mise à jour le {dateAsDay(blocStatistic.updated)}
            </p>
            <p className="fr-text--xs fr-mb-0">
              Source :{' '}
              <Link href={blocStatistic.source} target="_blank">
                {blocStatistic.source}
              </Link>
            </p>
          </div>
        ) : (
          <>
            <div className="fr-text--lg fr-mt-3w">
              {blocStatistic.label && <b>{blocStatistic.label}</b>}
            </div>
            {blocStatistic.statistics &&
              blocStatistic.statistics.map((statistic) => (
                <Statistic
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
  </div>
)

export default StatisticsBloc
