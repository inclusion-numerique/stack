import React from 'react'
import styles from '@app/web/components/Prefet/DepartementDashboard.module.css'

const DepartementDashboardHeader = () => (
  <div className={styles.header}>
    <h2>
      Déploiement des lieux et des dispositifs d’inclusion numérique sur votre
      territoire
    </h2>
    <p className="fr-text--xl fr-mb-0">
      Ce tableau de bord est un outil de travail développé à l’attention des
      préfectures de département et pouvant servir de support aux concertations
      menées dans le cadre de l’élaboration des feuilles de route
      territorialisées «&nbsp;France Numérique Ensemble&nbsp;».
    </p>
  </div>
)

export default DepartementDashboardHeader
