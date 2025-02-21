import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'

export const AucunLieu = () => (
  <div className="fr-text--center fr-background-alt--blue-france fr-p-12v fr-border-radius--8 fr-mb-4w">
    <span className="fr-text--bold fr-text--xl">
      Actuellement, vous n’avez aucun lieu d’activité.
    </span>
    <p className="fr-mb-8v">
      Créez vos lieux d’activités, ou sélectionnez vos lieux d’activités parmi
      ceux existant.
    </p>
    <Button
      linkProps={{
        href: '/coop/lieux-activite/ajouter',
      }}
      iconId="fr-icon-add-line"
    >
      Ajouter un lieu
    </Button>
  </div>
)
