import React from 'react'
import Box from '@app/web/components/Prefet/Box/Box'
import { DepartementDashboardData } from '@app/web/app/(prefet)/prefet/[codeDepartement]/getDepartementDashboardData'

const MainStatistics = ({
  data: {
    main: { inclusionLocations, aidantConnectLocations },
  },
}: {
  data: DepartementDashboardData
}) => (
  <>
    <Box className="fr-mb-3w fr-text-title--grey" {...inclusionLocations} />
    <Box className="fr-text-title--grey" {...aidantConnectLocations} />
  </>
)

export default MainStatistics
