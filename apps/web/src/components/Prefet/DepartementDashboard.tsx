import React from 'react'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import MainStatistics from '@app/web/components/Prefet/DepartementDashboard/MainStatistics'
import DetailedStatistics from '@app/web/components/Prefet/DepartementDashboard/DetailedStatistics'
import DepartementDashboardHeader from '@app/web/components/Prefet/DepartementDashboardHeader'
import type { DepartementDashboardData } from '@app/web/app/(private)/tableau-de-bord/departement/[codeDepartement]/getDepartementDashboardData'
import ErrorBoundary from '@app/web/components/ErrorBoundary'
import DepartementMap from './DepartementMap'

export type DepartementDashboardRegionOption = {
  code: string
  nom: string
  departements: {
    code: string
    nom: string
  }[]
}

const DepartementDashboard = ({
  data,
  regionOptions,
}: {
  data: DepartementDashboardData
  regionOptions?: DepartementDashboardRegionOption
}) => (
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
      <DepartementDashboardHeader
        currentCodeDepartement={data.departement.code}
        regionOptions={regionOptions}
      />
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-10w">
        <div className="fr-col-12 fr-col-md-5">
          <MainStatistics data={data} />
        </div>
        <div className="fr-col-12 fr-col-md-7">
          <ErrorBoundary>
            <DepartementMap departement={data.departement} />
          </ErrorBoundary>
        </div>
      </div>
      <DetailedStatistics data={data} />
    </div>
  </div>
)

export default DepartementDashboard
