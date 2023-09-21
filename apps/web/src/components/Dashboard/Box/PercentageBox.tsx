import React from 'react'
import { PercentageBoxData } from '@app/web/app/(private)/tableau-de-bord/departement/[codeDepartement]/getDepartementDashboardData'
import Percentage from './Percentage'
import Source from './Source'
import styles from './PercentageBox.module.css'

const colors = ['#DEE5FD', '#99B3F9', '#6B93F6', '#4E68BB', '#2F4077']

const PercentageBox = ({
  label,
  statistics,
  updated,
  source,
}: PercentageBoxData) => (
  <>
    <div className={styles.percentages}>
      {statistics.slice(0, 5).map((statistic, index) => (
        <div
          key={statistic.id}
          style={{
            height: '100%',
            width: `${statistic.value}%`,
            backgroundColor: colors[index],
          }}
        />
      ))}
    </div>
    <h6 className="fr-mb-2w">{label}</h6>
    {statistics.slice(0, 5).map((statistic, index) => (
      <Percentage
        color={colors[index]}
        label={statistic.label}
        value={statistic.value}
        key={statistic.id}
      />
    ))}
    <Source className="fr-mt-4w" date={updated} source={source} />
  </>
)

export default PercentageBox
