import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { DepartementGeoJson } from '@app/web/utils/map/departementGeoJson'
import { DepartementDashboardData } from '@app/web/components/Prefet/departementData'
import MainStatistics from '@app/web/components/Prefet/DepartementDashboard/MainStatistics'
import DetailedStatistics from '@app/web/components/Prefet/DepartementDashboard/DetailedStatistics'
import DepartementDashboardHeader from '@app/web/components/Prefet/DepartementDashboardHeader'
import DepartementMap from './DepartementMap'

const DepartementDashboard = ({
  departement,
  data,
}: {
  departement: DepartementGeoJson
  data: DepartementDashboardData
}) => (
  <>
    <Breadcrumb
      currentPageLabel={departement.name}
      segments={[
        {
          label: "Page d'accueil",
          linkProps: {
            href: '/',
          },
        },
      ]}
    />
    <div className="fr-mt-4v fr-pb-20v">
      <DepartementDashboardHeader />
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-10w">
        <div className="fr-col-5">
          <MainStatistics departement={departement} data={data} />
        </div>
        <div className="fr-col-7">
          <DepartementMap departement={departement} />
        </div>
      </div>
      <DetailedStatistics departement={departement} data={data} />
    </div>
  </>
)

export default DepartementDashboard
