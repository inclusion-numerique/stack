import React from 'react'
import Box from '@app/web/components/Dashboard/Box/Box'
import type { DepartementDashboardData } from '@app/web/app/(public)/donnees/departements/[codeDepartement]/getDepartementDashboardData'
import { NationalDashboardData } from '@app/web/app/(public)/donnees/national/getNationalDashboardData'

const MainStatistics = ({
  data: {
    main: { inclusionLocations, aidantConnectLocations },
  },
}: {
  data: DepartementDashboardData | NationalDashboardData
}) => (
  <>
    <Box className="fr-mb-3w fr-text-title--grey" {...inclusionLocations} />
    <Box className="fr-text-title--grey" {...aidantConnectLocations} />
  </>
)

export default MainStatistics
