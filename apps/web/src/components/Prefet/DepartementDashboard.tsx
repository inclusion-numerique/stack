import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import MainStatistics from '@app/web/components/Prefet/DepartementDashboard/MainStatistics'
import DetailedStatistics from '@app/web/components/Prefet/DepartementDashboard/DetailedStatistics'
import DepartementDashboardHeader from '@app/web/components/Prefet/DepartementDashboardHeader'
import type { DepartementDashboardData } from '@app/web/app/(private)/tableau-de-bord/departement/[codeDepartement]/getDepartementDashboardData'
import DepartementMap from './DepartementMap'

const DepartementDashboard = ({ data }: { data: DepartementDashboardData }) => (
  <>
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
      <DepartementDashboardHeader />
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-10w">
        <div className="fr-col-12 fr-col-md-5">
          <MainStatistics data={data} />
        </div>
        <div className="fr-col-12 fr-col-md-7">
          <DepartementMap departement={data.departement} />
        </div>
      </div>
      <DetailedStatistics data={data} />
    </div>
  </>
)

export default DepartementDashboard
