import React from 'react'
import classNames from 'classnames'
import DepartementSwitcher from '@app/web/components/Dashboard/DepartementSwitcher'
import styles from '@app/web/components/Dashboard/DashboardHeader.module.css'
import { OptionTuples } from '@app/web/utils/options'

const DashboardHeader = ({
  departementOptions,
  currentCodeDepartement,
}: {
  departementOptions: OptionTuples
  currentCodeDepartement?: string
}) => (
  <div
    className={classNames(
      styles.header,
      'fr-flex fr-direction-column fr-flex-gap-6v fr-direction-md-row fr-align-items-md-center fr-justify-content-space-between',
    )}
  >
    <div className="fr-mr-3w">
      <h1 className="fr-h2 fr-text-title--blue-france fr-mb-4v">
        Données de l’inclusion numérique
      </h1>
      <p className="fr-text--xl fr-mb-0">
        Découvrez grâce à ce tableau de bord un état des lieux par département
        de l’inclusion numérique et ses chiffres clés.
      </p>
    </div>
    <DepartementSwitcher
      departementOptions={departementOptions}
      currentCodeDepartement={currentCodeDepartement}
      target="donnees"
    />
  </div>
)

export default DashboardHeader
