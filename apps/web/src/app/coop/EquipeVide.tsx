import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'

export const EquipeVide = () => (
  <div className="fr-text--center fr-background-alt--blue-france fr-p-12v fr-border-radius--8 fr-mb-4w">
    <span className="fr-text--bold fr-text--xl">
      Actuellement, vous n’avez aucun membre dans votre équipe.
    </span>
    <p className="fr-mb-8v">
      Invitez les médiateurs et médiatrices numériques que vous souhaitez
      coordonnez à rejoindre votre équipe.
    </p>
    <Button
      linkProps={{
        href: 'coop/mon-equipe/inviter',
      }}
      iconId="fr-icon-user-add-line"
    >
      Inviter des membres
    </Button>
  </div>
)
