import React from 'react'
import Box from '@app/web/components/Prefet/Box/Box'
import type { DepartementDashboardData } from '@app/web/app/(private)/tableau-de-bord/departement/[codeDepartement]/getDepartementDashboardData'

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
