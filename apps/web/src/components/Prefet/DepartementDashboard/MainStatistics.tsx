import React from 'react'
import { DepartementGeoJson } from '@app/web/utils/map/departementGeoJson'
import { DepartementDashboardData } from '@app/web/components/Prefet/departementData'
import Box from '@app/web/components/Prefet/Box/Box'

const MainStatistics = ({
  data: {
    main: { inclusionLocations, aidantConnectLocations },
  },
}: {
  departement: DepartementGeoJson
  data: DepartementDashboardData
}) => (
  <>
    <Box className="fr-mb-3w" {...inclusionLocations} />
    <Box {...aidantConnectLocations} />
  </>
)

export default MainStatistics
