import React from 'react'
import { SegmentedControl } from '@codegouvfr/react-dsfr/SegmentedControl'

export const Statistiques = () => (
  <>
    <div className="fr-flex fr-flex-wrap fr-flex-gap-4v fr-align-items-center fr-justify-content-space-between fr-mb-3w">
      <h2 className="fr-h5 fr-text-mention--grey fr-mb-0">
        <span className="ri-chat-poll-line fr-mr-1w" aria-hidden />
        statistiques
      </h2>
      <SegmentedControl
        small
        hideLegend
        legend="Période de statistiques"
        segments={[
          { label: 'Sur les 30 derniers jours' },
          { label: 'Sur les 7 derniers jours' },
        ]}
      />
    </div>
    <div className="fr-grid-row fr-grid-row--gutters">
      <div className="fr-col-lg-6 fr-col-md-12 fr-col-sm-6 fr-col-12">
        <div className="fr-p-3w fr-border-radius--16 fr-background-alt--brown-caramel fr-height-full">
          <span
            className="ri-user-heart-line ri-2x fr-text-label--brown-caramel"
            aria-hidden
          />
          <div className="fr-text--bold fr-my-1w fr-text--xl">
            {0} Bénéficiaires accompagnés
          </div>
          <ul className="fr-text-mention--grey fr-text--sm fr-mb-0 fr-list-group">
            <li>{0} bénéficiaires suivis</li>
            <li>{0} bénéficiaires anonymes</li>
          </ul>
        </div>
      </div>
      <div className="fr-col-lg-6 fr-col-md-12 fr-col-sm-6 fr-col-12">
        <div className="fr-p-3w fr-border-radius--16 fr-background-alt--brown-caramel fr-height-full">
          <span
            className="ri-service-line ri-2x fr-text-label--brown-caramel"
            aria-hidden
          />
          <div className="fr-text--bold fr-my-1w fr-text--xl">
            {0} Accompagnements
          </div>
          <ul className="fr-text-mention--grey fr-text--sm fr-mb-0 fr-list-group">
            <li>{0} accompagnements individuels</li>
            <li>{0} participants lors de 0 ateliers</li>
            <li>{0} aides aux démarches administratives</li>
          </ul>
        </div>
      </div>
    </div>
  </>
)
