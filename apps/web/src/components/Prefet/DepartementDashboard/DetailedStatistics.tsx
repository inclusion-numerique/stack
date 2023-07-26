import React, { PropsWithChildren } from 'react'
import Box from '@app/web/components/Prefet/Box/Box'
import {
  BoxesData,
  DepartementDashboardData,
} from '@app/web/app/(prefet)/prefet/[codeDepartement]/getDepartementDashboardData'

const StatisticsWrapper = ({
  id,
  label,
  boxes,
  description,
}: PropsWithChildren<BoxesData>) => (
  <div key={id} className="fr-mb-10w fr-text-title--grey">
    <h2 className="fr-mb-2w">{label}</h2>
    {description && <p className="fr-mb-4w">{description}</p>}
    <div className="fr-grid-row fr-grid-row--gutters">
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
  data: DepartementDashboardData
}) => (
  <>
    <StatisticsWrapper {...publicsAccompagnes} />
    <StatisticsWrapper {...accompagnements} />
  </>
)

export default DetailedStatistics
