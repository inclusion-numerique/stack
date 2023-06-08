'use client'

import React, { useState } from 'react'
import classNames from 'classnames'
import SearchBar from '@codegouvfr/react-dsfr/SearchBar'
import Button from '@codegouvfr/react-dsfr/Button'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import styles from './Legend.module.css'

const Legend = () => {
  const [legendCollapsed, setLegendCollapsed] = useState(false)

  return (
    <div
      className={classNames(styles.container, {
        [styles.collapsed]: legendCollapsed,
      })}
    >
      <Button
        className={styles.collapseButton}
        iconId={
          legendCollapsed
            ? 'fr-icon-arrow-right-s-line-double'
            : 'fr-icon-arrow-left-s-line-double'
        }
        title="Réduire la légende"
        onClick={() => setLegendCollapsed(!legendCollapsed)}
        priority="tertiary no outline"
        size="small"
      />
      {!legendCollapsed && (
        <div className={styles.legend}>
          <Breadcrumb
            currentPageLabel="Cartographie"
            segments={[
              {
                label: "Page d'accueil",
                linkProps: {
                  href: '/',
                },
              },
              {
                label: 'Tableau de bord',
                linkProps: {
                  href: '/prefet',
                },
              },
            ]}
          />
          <SearchBar label="Recherche une commune" />
          <h6 className={styles.legendTitle}>
            Les acteurs de l&lsquo;Inclusion Numérique
          </h6>
          <p className="fr-text--xs fr-hint-text fr-mb-3w">Source : ???</p>
        </div>
      )}
    </div>
  )
}

export default Legend
