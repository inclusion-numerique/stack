import React from 'react'
import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'

const StatistiqueElement = ({
  name,
  count,
  icon,
}: {
  name: string
  count: number
  icon: string
}) => (
  <div className="fr-background-default--grey fr-border-radius--8 fr-p-4v fr-width-full">
    <div className="fr-flex fr-flex-gap-3v fr-align-items-center">
      <span
        className={classNames(
          icon,
          'ri-lg fr-background-alt--brown-caramel-950 fr-text-label--brown-caramel fr-p-3v fr-border-radius--8 fr-line-height-1',
        )}
        aria-hidden="true"
      />
      <span className="fr-flex fr-direction-column">
        <span className="fr-text--lg fr-text--bold fr-mb-0">{count}</span>
        <span className="fr-text-mention--grey fr-text--sm fr-mb-0">
          {name}
        </span>
      </span>
    </div>
  </div>
)

export const Statistiques = ({
  mediateurId,
  beneficiairesAccompagnes,
  accompagnements,
}: {
  mediateurId: string
  beneficiairesAccompagnes: number
  accompagnements: number
}) => (
  <>
    <span className="fr-flex fr-direction-column fr-direction-md-row fr-flex-gap-3v fr-mb-6v">
      <span className="fr-flex fr-align-items-center fr-flex-gap-3v">
        <span
          className="ri-chat-poll-line ri-lg fr-text-mention--grey"
          aria-hidden
        />
        <h2 className="fr-h6 fr-text-mention--grey fr-mb-0">
          Statistiques d’activité sur les 30 derniers jours
        </h2>
      </span>
      <Button
        className="fr-ml-md-auto"
        priority="tertiary no outline"
        size="small"
        iconId="fr-icon-arrow-right-line"
        iconPosition="right"
        title="Ouvre la page des statisiques"
        linkProps={{ href: `/coop/mes-statistiques?mediateur=${mediateurId}` }}
      >
        Voir ses statistiques
      </Button>
    </span>
    <div className="fr-grid-row fr-grid-row--gutters">
      <div className="fr-col-md-6 fr-col-12">
        <StatistiqueElement
          name="Bénéficiaires accompagnés"
          count={beneficiairesAccompagnes}
          icon="ri-user-heart-line"
        />
      </div>
      <div className="fr-col-md-6 fr-col-12">
        <StatistiqueElement
          name="Accompagnements"
          count={accompagnements}
          icon="ri-service-line"
        />
      </div>
    </div>
  </>
)
