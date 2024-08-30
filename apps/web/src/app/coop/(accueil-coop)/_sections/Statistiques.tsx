'use client'

import React, { useState } from 'react'
import { SegmentedControl } from '@codegouvfr/react-dsfr/SegmentedControl'
import { AccueilPageData } from '../getAccueilPageData'

const BeneficiairesStatistiques = ({
  beneficiaires,
  anonymes,
}: {
  beneficiaires: number
  anonymes: number
}) => (
  <div className="fr-p-3w fr-border-radius--16 fr-background-alt--brown-caramel fr-height-full">
    <span
      className="ri-user-heart-line ri-2x fr-text-label--brown-caramel"
      aria-hidden
    />
    <div className="fr-text--bold fr-my-1w fr-text--xl">
      {beneficiaires + anonymes} Bénéficiaires accompagnés
    </div>
    <ul className="fr-text-mention--grey fr-text--sm fr-mb-0 fr-list-group">
      <li>{beneficiaires} bénéficiaires suivis</li>
      <li>{anonymes} bénéficiaires anonymes</li>
    </ul>
  </div>
)

const AccompagnementsStatistiques = ({
  modalitesAccompagnement,
}: {
  modalitesAccompagnement: {
    label: string
    count: number
    participants?: number
  }[]
}) => (
  <div className="fr-p-3w fr-border-radius--16 fr-background-alt--brown-caramel fr-height-full">
    <span
      className="ri-service-line ri-2x fr-text-label--brown-caramel"
      aria-hidden
    />
    <div className="fr-text--bold fr-my-1w fr-text--xl">
      {modalitesAccompagnement[0].count +
        (modalitesAccompagnement[1].participants ?? 0) +
        modalitesAccompagnement[2].count}{' '}
      Accompagnements
    </div>
    <ul className="fr-text-mention--grey fr-text--sm fr-mb-0 fr-list-group">
      <li>{modalitesAccompagnement[0].count} accompagnements individuels</li>
      <li>
        {modalitesAccompagnement[1].participants} participants lors de{' '}
        {modalitesAccompagnement[1].count} ateliers
      </li>
      <li>
        {modalitesAccompagnement[2].count} aides aux démarches administratives
      </li>
    </ul>
  </div>
)

export const Statistiques = ({
  accompagnementBeneficiaires,
  modalitesAccompagnement,
}: AccueilPageData['statistiques']) => {
  const [isMonthSelected, setIsMonthSelected] = useState(true)

  return (
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
            {
              label: 'Sur les 30 derniers jours',
              nativeInputProps: {
                checked: isMonthSelected,
                onClick: () => setIsMonthSelected(true),
              },
            },
            {
              label: 'Sur les 7 derniers jours',
              nativeInputProps: {
                checked: !isMonthSelected,
                onClick: () => setIsMonthSelected(false),
              },
            },
          ]}
        />
      </div>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-lg-6 fr-col-md-12 fr-col-sm-6 fr-col-12">
          <BeneficiairesStatistiques
            {...(isMonthSelected
              ? accompagnementBeneficiaires.dernierMois
              : accompagnementBeneficiaires.derniereSemaine)}
          />
        </div>
        <div className="fr-col-lg-6 fr-col-md-12 fr-col-sm-6 fr-col-12">
          <AccompagnementsStatistiques
            modalitesAccompagnement={
              isMonthSelected
                ? modalitesAccompagnement.dernierMois
                : modalitesAccompagnement.derniereSemaine
            }
          />
        </div>
      </div>
    </>
  )
}
