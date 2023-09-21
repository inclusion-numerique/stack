import React from 'react'
import styles from '@app/web/components/Dashboard/DepartementDashboard.module.css'
import type { DepartementDashboardRegionOption } from '@app/web/components/Dashboard/DepartementDashboard'
import DepartementSwitcher from '@app/web/components/Dashboard/DepartementDashboard/DepartementSwitcher'

const DepartementDashboardHeader = ({
  regionOptions,
  currentCodeDepartement,
  national,
}: {
  regionOptions?: DepartementDashboardRegionOption
  currentCodeDepartement?: string
  national?: boolean
}) => (
  <div className={styles.header}>
    <div className="fr-mr-3w">
      <h2>
        Déploiement des lieux et des dispositifs d’inclusion numérique{' '}
        {national ? 'au niveau national' : 'sur votre territoire'}
      </h2>
      <p className="fr-text--xl fr-mb-0">
        Ce tableau de bord est un outil de travail développé à l’attention des
        préfectures de département et pouvant servir de support aux
        concertations menées dans le cadre de l’élaboration des feuilles de
        route territorialisées «&nbsp;France Numérique Ensemble&nbsp;».
      </p>
    </div>
    {regionOptions && (
      <DepartementSwitcher
        regionOptions={regionOptions}
        currentCodeDepartement={currentCodeDepartement}
      />
    )}
  </div>
)

export default DepartementDashboardHeader
