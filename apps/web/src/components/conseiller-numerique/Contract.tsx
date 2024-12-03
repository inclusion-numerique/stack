import Badge from '@codegouvfr/react-dsfr/Badge'
import Link from 'next/link'
import React from 'react'
import Card from '@app/web/components/Card'

const showContratInfoFeatureFlag = false

const Contract = ({
  isCoordinateur,
  type,
  start,
  end,
  finDeContrat,
}: {
  isCoordinateur: boolean
  type: string
  start: string | null
  end: string | null
  finDeContrat: boolean | null
}) =>
  showContratInfoFeatureFlag ? (
    <Card
      noBorder
      className="fr-border fr-border-radius--8"
      titleAs="h2"
      title={
        <span className="fr-flex fr-justify-content-space-between fr-align-items-end fr-mb-4v">
          <span className="fr-flex fr-flex-gap-3v fr-align-items-end fr-h6 fr-mb-0">
            <span className="fr-flex fr-background-alt--blue-france fr-p-2v fr-border-radius--8">
              <img
                width="20px"
                height="20px"
                src={
                  isCoordinateur
                    ? '/images/illustrations/role/coordination.svg'
                    : '/images/illustrations/role/conseillers-numerique.svg'
                }
                alt=""
              />
            </span>
            <span className="fr-text-title--blue-france">
              {isCoordinateur
                ? 'Contrat coordinateur de conseiller numérique'
                : 'Contrat conseiller numérique'}
            </span>
          </span>
          <span>
            {finDeContrat && (
              <Badge severity="warning">Fin de contrat prochaine</Badge>
            )}
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
  ) : null

export default Contract
