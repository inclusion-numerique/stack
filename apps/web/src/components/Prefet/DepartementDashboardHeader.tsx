import Link from 'next/link'
import React from 'react'
import styles from '@app/web/components/Prefet/DepartementDashboard.module.css'

const DepartementDashboardHeader = () => (
  <div className={styles.header}>
    <h2>Déploiement de l&lsquo;inclusion Numérique sur votre territoire</h2>
    <span className="fr-text--xs">
      Source : <Link href="/">Données & territoires</Link>
    </span>
  </div>
)

export default DepartementDashboardHeader
