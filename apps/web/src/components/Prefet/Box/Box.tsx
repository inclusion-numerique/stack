import React from 'react'
import classNames from 'classnames'
import { Box as BoxType } from '../data'
import StatisticBox from './StatisticBox'
import styles from './Box.module.css'
import PercentageBox from './PercentageBox'

const Box = ({ className, ...bloc }: BoxType & { className?: string }) => (
  <div className={classNames(className, styles.bloc)}>
    {'value' in bloc ? <StatisticBox {...bloc} /> : <PercentageBox {...bloc} />}
  </div>
)

export default Box
