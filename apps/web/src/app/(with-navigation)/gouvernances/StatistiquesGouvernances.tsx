import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import React from 'react'
import type { StatistiquesGouvernance } from '@app/web/app/(with-navigation)/gouvernances/getStatistiquesGouvernances'
import styles from '@app/web/app/(with-navigation)/gouvernances/Gouvernances.module.css'
import { gouvernanceCandidatsPath } from '@app/web/app/(with-navigation)/gouvernances/gouvernancePaths'
import type { GouvernanceScope } from '@app/web/gouvernance/GouvernanceScope'

const StatistiquesGouvernances = ({
  statistiquesGouvernance,
  scopeTitle,
  ...scope
}: {
  scopeTitle: string
  statistiquesGouvernance: StatistiquesGouvernance
} & GouvernanceScope) => (
  <>
    <h1 className="fr-h3 fr-mt-15v fr-mb-12v">Gouvernance · {scopeTitle}</h1>
    <div className="fr-mb-12v fr-flex fr-align-items-center fr-justify-content-space-between">
      <h4 className={classNames('fr-mb-0', styles.statisticsTitle)}>
        Les acteurs{' '}
        {scope.national ? 'au niveau national' : 'de votre territoire'}{' '}
        souhaitant porter ou participer à une feuille de route locale France
        Numérique Ensemble.
      </h4>
      <Button
        className="fr-ml-2w fr-flex-shrink-0"
        iconId="fr-icon-arrow-right-line"
        iconPosition="right"
        priority="secondary"
        linkProps={{ href: gouvernanceCandidatsPath(scope) }}
      >
        Voir le détail
      </Button>
    </div>
    <section className={styles.statisticsCardContainer}>
      <div className={styles.statisticsCard}>
        <div className="fr-badge fr-badge--yellow-tournesol">
          Porteurs d’une feuille de route
        </div>
        <hr />
        <div className={classNames(styles.statisticsLabelAndValue)}>
          <h6>Collectivités</h6>
          <p>{statistiquesGouvernance.porteurs}</p>
        </div>
      </div>
      <div className={styles.statisticsCard}>
        <div className="fr-badge fr-badge--purple-glycine">
          Partenaires suggérés
        </div>
        <hr />
        <div className={styles.statisticsLabelAndValue}>
          <h6>Collectivités</h6>
          <p>{statistiquesGouvernance.partenairesSuggeres}</p>
        </div>
        <div className={styles.statisticsLabelAndValue}>
          <h6>Structures</h6>
          <p>{statistiquesGouvernance.structuresSuggerees}</p>
        </div>
      </div>
      <div className={styles.statisticsCard}>
        <div className="fr-badge fr-badge--blue-cumulus">
          Souhaitent participer
        </div>
        <hr />
        <div className={styles.statisticsLabelAndValue}>
          <h6>Collectivités</h6>
          <p>{statistiquesGouvernance.souhaitentParticiper.collectivites}</p>
        </div>
        <div className={styles.statisticsLabelAndValue}>
          <h6>Structures</h6>
          <p>{statistiquesGouvernance.souhaitentParticiper.structures}</p>
        </div>
      </div>
    </section>
  </>
)

export default StatistiquesGouvernances
