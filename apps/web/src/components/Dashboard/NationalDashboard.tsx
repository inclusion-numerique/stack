import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import DetailedStatistics from '@app/web/components/Dashboard/DepartementDashboard/DetailedStatistics'
import DepartementDashboardHeader from '@app/web/components/Dashboard/DepartementDashboardHeader'
import { NationalDashboardData } from '@app/web/app/(public)/donnees/national/getNationalDashboardData'
import Box from '@app/web/components/Dashboard/Box/Box'

const NationalDashboard = ({ data }: { data: NationalDashboardData }) => (
  <div className="fr-container">
    <Breadcrumb
      currentPageLabel="Tableau de bord"
      segments={[
        {
          label: "Page d'accueil",
          linkProps: {
            href: '/',
          },
        },
      ]}
    />
    <div className="fr-mt-4v fr-pb-14v">
      <DepartementDashboardHeader national />
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-10w">
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
      </div>
      <DetailedStatistics data={data} />
    </div>
  </div>
)

export default NationalDashboard
