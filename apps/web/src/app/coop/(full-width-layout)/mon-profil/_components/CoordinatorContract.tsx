import Link from 'next/link'
import React from 'react'
import Card from '@app/web/components/Card'

const CoordinatorContract = ({
  type,
  start,
  end,
}: {
  type: string
  start: string | null
  end: string | null
}) => (
  <Card
    noBorder
    className="fr-border fr-border-radius--8"
    titleAs="h2"
    title={
      <span className="fr-flex fr-flex-gap-3v fr-align-items-end">
        <img
          className="fr-background-alt--blue-france fr-p-1w fr-border-radius--8"
          src="/images/illustrations/mon-profil/coordination.svg"
          alt=""
        />
        <span className="fr-text-title--blue-france">
          Contrat coordinateur de conseiller numérique
        </span>
      </span>
    }
    description={
      <>
        <div className="fr-grid-row fr-text--md fr-mb-3w fr-mt-1w">
          <div className="fr-col-4 fr-flex fr-direction-column">
            <span className="fr-text-mention--grey">Type de contrat</span>
            <span className="fr-text--semi-bold">{type}</span>
          </div>
          {start && (
            <div className="fr-col-4 fr-flex fr-direction-column">
              <span className="fr-text-mention--grey">Date de début</span>
              <span className="fr-text--semi-bold">{start}</span>
            </div>
          )}
          {end && (
            <div className="fr-col-4 fr-flex fr-direction-column">
              <span className="fr-text-mention--grey">Date de fin</span>
              <span className="fr-text--semi-bold">{end}</span>
            </div>
          )}
        </div>
        <em className="fr-text--xs fr-text-mention--grey">
          Si vous constatez une erreur sur les informations concernant ce
          contrat, veuillez contacter le support du dispositif conseiller
          numérique&nbsp;:&nbsp;
          <Link href="mailto:conseiller-numerique@anct.gouv.fr">
            conseiller-numerique@anct.gouv.fr
          </Link>
        </em>
      </>
    }
  />
)

export default CoordinatorContract
