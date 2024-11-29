'use client'

import { useState } from 'react'
import { formatDate } from 'date-fns'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import Card from '@app/web/components/Card'
import { Typologies } from '@app/web/components/structure/Typologies'

export const LieuxActivites = ({
  lieuxActivites,
  mediateurId,
}: {
  lieuxActivites: {
    id: string
    modification: Date
    structure: {
      id: string
      nom: string
      adresse: string
      complementAdresse?: string | null
      commune: string
      codePostal: string
      typologies: string[]
      siret?: string | null
      rna?: string | null
      _count: { mediateursEnActivite: number }
    }
    creation: Date
  }[]
  mediateurId: string
}) => {
  const [showMore, setShowMore] = useState(false)

  return (
    <Card
      noBorder
      className="fr-border fr-border-radius--8"
      titleAs="div"
      title={
        <span className="fr-flex fr-flex-gap-3v fr-align-items-end fr-mb-0">
          <span
            className="ri-home-office-line fr-line-height-1 fr-text--medium fr-text-label--blue-france fr-background-alt--blue-france fr-p-2v fr-border-radius--8"
            aria-hidden
          />
          <h2 className="fr-text-title--blue-france fr-h6 fr-m-0">
            Lieux d’activité · {lieuxActivites.length}
          </h2>
        </span>
      }
    >
      <ul className="fr-list-group">
        {lieuxActivites.slice(0, showMore ? lieuxActivites.length : 3).map(
          ({
            id: structureId,
            modification,
            structure: {
              nom,
              adresse,
              complementAdresse,
              codePostal,
              commune,
              typologies,
              _count: { mediateursEnActivite: mediateursCount },
            },
          }) => (
            <li className="fr-border--top fr-py-5v" key={structureId}>
              <div className="fr-flex fr-align-items-center">
                <div className="fr-flex-grow-1">
                  <div className="fr-text--xs fr-mb-0">
                    Mis à jour le{' '}
                    {formatDate(new Date(modification), 'dd.MM.yyyy')}
                  </div>
                  <div className="fr-text--bold fr-my-1v">{nom}</div>
                  <div className="fr-text--sm fr-mb-0 fr-text-mention--grey">
                    <Typologies
                      id={`typologies-lieu-activite-${structureId}`}
                      typologies={typologies}
                    />
                    <div className="fr-flex fr-flex-gap-2v">
                      <span>
                        <span className="ri-map-pin-2-line" aria-hidden />{' '}
                        {adresse}
                        {complementAdresse && ` (${complementAdresse})`},{' '}
                        {codePostal} {commune}
                      </span>
                      {mediateursCount > 1 && (
                        <>
                          <span>·</span>
                          <span>
                            <Badge severity="info" small noIcon>
                              <span
                                className="ri-account-circle-fill fr-mr-1v"
                                aria-hidden
                              />{' '}
                              {mediateursCount}
                            </Badge>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    title="Voir la fiche du lieu"
                    size="small"
                    iconId="fr-icon-arrow-right-line"
                    iconPosition="right"
                    priority="tertiary no outline"
                    linkProps={{
                      href: `${mediateurId}/${structureId}`,
                    }}
                  >
                    Voir
                  </Button>
                </div>
              </div>
            </li>
          ),
        )}
      </ul>
      {lieuxActivites.length > 3 && (
        <div className="fr-border--top fr-pt-6v">
          <Button
            title="Afficher toutes les lieux d'activités"
            priority="tertiary no outline"
            iconId={
              showMore ? 'fr-icon-arrow-up-s-line' : 'fr-icon-arrow-down-s-line'
            }
            iconPosition="right"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'Voir moins' : 'Voir tous'}
          </Button>
        </div>
      )}
    </Card>
  )
}
