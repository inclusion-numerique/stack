'use client'

import React, { useState } from 'react'
import { SegmentedControl } from '@codegouvfr/react-dsfr/SegmentedControl'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { AccueilPageData } from '../getAccueilPageDataFor'

const BeneficiairesStatistiques = ({
  total,
  suivis,
  anonymes,
}: {
  total: number
  suivis: number
  anonymes: number
}) => (
  <div className="fr-p-3w fr-border-radius--16 fr-background-alt--brown-caramel fr-height-full">
    <span
      className="ri-user-heart-line ri-2x fr-text-label--brown-caramel"
      aria-hidden
    />
    <div className="fr-text--bold fr-my-1w fr-text--xl">
      {total} Bénéficiaire{sPluriel(total)} accompagné{sPluriel(total)}
    </div>
    <ul className="fr-text-mention--grey fr-text--sm fr-mb-0 fr-list-group">
      <li>
        {suivis} bénéficiaire{sPluriel(suivis)} suivi{sPluriel(suivis)}
      </li>
      <li>
        {anonymes} bénéficiaire{sPluriel(anonymes)} anonyme{sPluriel(anonymes)}
      </li>
    </ul>
  </div>
)

const AccompagnementsStatistiques = ({
  individuels,
  collectifs,
  demarches,
}: {
  individuels: { total: number; proportion: number }
  collectifs: { total: number; proportion: number; participants: number }
  demarches: { total: number; proportion: number }
}) => (
  <div className="fr-p-3w fr-border-radius--16 fr-background-alt--brown-caramel fr-height-full">
    <span
      className="ri-service-line ri-2x fr-text-label--brown-caramel"
      aria-hidden
    />
    <div className="fr-text--bold fr-my-1w fr-text--xl">
      {collectifs.participants + individuels.total + demarches.total}{' '}
      Accompagnement
      {sPluriel(collectifs.participants + individuels.total + demarches.total)}
    </div>
    <ul className="fr-text-mention--grey fr-text--sm fr-mb-0 fr-list-group">
      <li>
        {individuels.total} accompagnement{sPluriel(individuels.total)}{' '}
        individuel{sPluriel(individuels.total)}
      </li>
      <li>
        {collectifs.participants} participation
        {sPluriel(collectifs.participants)} lors de {collectifs.total} atelier
        {sPluriel(collectifs.total)}
      </li>
      <li>
        {demarches.total} aide{sPluriel(demarches.total)} aux démarches
        administratives
      </li>
    </ul>
  </div>
)

export const Statistiques = ({
  totalCountsStats7Days,
  totalCountsStats30Days,
}: AccueilPageData['statistiques']) => {
  const [isMonthSelected, setIsMonthSelected] = useState(true)

  return (
    <>
      <div className="fr-flex fr-flex-wrap fr-flex-gap-4v fr-align-items-center fr-justify-content-space-between fr-mb-3w">
        <h2 className="fr-h5 fr-text-mention--grey fr-mb-0">
          <span className="ri-chat-poll-line fr-mr-1w" aria-hidden />
          Statistiques
        </h2>
        <SegmentedControl
          small
          hideLegend
          legend="Période de statistiques"
          segments={[
            {
              label: 'Sur les 30 derniers jours',
              nativeInputProps: {
                defaultChecked: isMonthSelected,
                onClick: () => setIsMonthSelected(true),
              },
            },
            {
              label: 'Sur les 7 derniers jours',
              nativeInputProps: {
                defaultChecked: !isMonthSelected,
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
              ? totalCountsStats30Days.beneficiaires
              : totalCountsStats7Days.beneficiaires)}
          />
        </div>
        <div className="fr-col-lg-6 fr-col-md-12 fr-col-sm-6 fr-col-12">
          <AccompagnementsStatistiques
            {...(isMonthSelected
              ? totalCountsStats30Days.activites
              : totalCountsStats7Days.activites)}
          />
        </div>
      </div>
    </>
  )
}
