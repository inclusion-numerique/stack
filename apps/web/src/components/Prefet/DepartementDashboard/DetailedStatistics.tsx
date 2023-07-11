import React, { PropsWithChildren } from 'react'
import { DepartementGeoJson } from '@app/web/utils/map/departementGeoJson'
import {
  Boxes,
  DepartementDashboardData,
} from '@app/web/components/Prefet/departementData'
import Box from '@app/web/components/Prefet/Box/Box'

const StatisticsWrapper = ({
  id,
  label,
  boxes,
  description,
}: PropsWithChildren<Boxes>) => (
  <div key={id} className="fr-mb-10w">
    <h2 className="fr-mb-2w">{label}</h2>
    {description && <p className="fr-mb-4w">{description}</p>}
    <div className="fr-grid-row fr-grid-row--gutters">
      {boxes.map((box) => (
        <div key={box.id} className="fr-col-4">
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
  departement: DepartementGeoJson
  data: DepartementDashboardData
}) => (
  <>
    <StatisticsWrapper {...publicsAccompagnes} />
    <StatisticsWrapper {...accompagnements} />
  </>
)

export default DetailedStatistics
