import React from 'react'
import styles from '@app/web/components/Prefet/DepartementDashboard.module.css'

const DepartementDashboardHeader = () => (
  <div className={styles.header}>
    <h2>Déploiement de l&lsquo;inclusion Numérique sur votre territoire</h2>
    <p className="fr-text--xl fr-mb-0">
      Ce tableau de bord est un outil de travail développé à l’attention des
      préfectures de départements dans le cadre de la feuille de route
      «&nbsp;France Numérique Ensemble&nbsp;».
    </p>
  </div>
)

export default DepartementDashboardHeader
