import React from 'react'
import DetailedStatistics from '@app/web/components/Dashboard/DetailedStatistics'
import ErrorBoundary from '@app/web/components/ErrorBoundary'
import DepartementMap from '@app/web/components/Dashboard/DepartementMap'
import type { DashboardData } from '@app/web/app/(public)/donnees/getDashboardData'
import Box from '@app/web/components/Dashboard/Box/Box'

const DashboardContent = ({ data }: { data: DashboardData }) => {
  const showDepartementMap = data.departement

  // The layout is two columns for main stats if there is no map
  return (
    <>
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-10w">
        {showDepartementMap ? (
          <div className="fr-col-12 fr-col-md-5">
            <Box
              className="fr-mb-3w fr-text-title--grey"
              {...data.main.inclusionLocations}
            />
            <Box
              className="fr-text-title--grey"
              {...data.main.aidantConnectLocations}
            />
          </div>
        ) : (
          <>
            <div className="fr-col-12 fr-col-md-6">
              <Box
                className="fr-mb-3w fr-text-title--grey"
                {...data.main.inclusionLocations}
              />
            </div>
            <div className="fr-col-12 fr-col-md-6">
              <Box
                className="fr-text-title--grey"
                {...data.main.aidantConnectLocations}
              />
            </div>
          </>
        )}
        {showDepartementMap && (
          <div className="fr-col-12 fr-col-md-7">
            <ErrorBoundary>
              <DepartementMap departement={showDepartementMap} />
            </ErrorBoundary>
          </div>
        )}
      </div>
      <DetailedStatistics data={data} />
    </>
  )
}

export default DashboardContent
