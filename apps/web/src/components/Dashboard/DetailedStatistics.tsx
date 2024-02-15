import React, { PropsWithChildren } from 'react'
import {
  BoxesData,
  DashboardData,
} from '@app/web/app/(public)/donnees/getDashboardData'
import Box from '@app/web/components/Dashboard/Box/Box'

const StatisticsWrapper = ({
  id,
  label,
  boxes,
  description,
}: PropsWithChildren<BoxesData>) => (
  <div key={id} className="fr-mb-10w fr-text-title--grey">
    <h2 className="fr-h3 fr-mt-14v fr-mb-8v">{label}</h2>
    {description && <p className="fr-mb-8v">{description}</p>}
    <div className="fr-grid-row fr-grid-row--gutters fr-mt-8v">
      {boxes.map((box) => (
        <div key={box.id} className="fr-col-12 fr-col-lg-4">
          <Box fullHeight {...box} />
        </div>
      ))}
    </div>
  </div>
)

const DetailedStatistics = ({
  data: {
    detailed: { publicsAccompagnes, accompagnements },
  },
}: {
  data: DashboardData
}) => (
  <>
    <StatisticsWrapper {...publicsAccompagnes} />
    <StatisticsWrapper {...accompagnements} />
  </>
)

export default DetailedStatistics
