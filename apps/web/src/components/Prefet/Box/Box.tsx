import React from 'react'
import classNames from 'classnames'
import { BoxData } from '@app/web/app/(private)/tableau-de-bord/departement/[codeDepartement]/getDepartementDashboardData'
import StatisticBox from './StatisticBox'
import styles from './Box.module.css'
import PercentageBox from './PercentageBox'

const Box = ({
  className,
  fullHeight,
  ...bloc
}: BoxData & { fullHeight?: boolean; className?: string }) => (
  <div
    className={classNames(className, styles.bloc, {
      [styles.fullHeight]: fullHeight,
    })}
  >
    {'value' in bloc ? <StatisticBox {...bloc} /> : <PercentageBox {...bloc} />}
  </div>
)

export default Box
