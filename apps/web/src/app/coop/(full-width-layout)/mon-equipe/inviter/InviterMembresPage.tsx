import React from 'react'
import Card from '@app/web/components/Card'
import InviterMembreForm from './InviterMembreForm'

export const InviterMembresPage = () => (
  <Card
    noBorder
    titleAs="div"
    className="fr-border fr-border-radius--8 fr-background-default--grey fr-p-4v"
    title={
      <span className="fr-flex fr-align-items-center fr-flex-gap-6v">
        <span
          className="ri-user-add-line ri-md fr-line-height-1 fr-text-label--blue-france fr-background-alt--blue-france fr-p-2w fr-m-0 fr-border-radius--8 fr-text--regular"
          aria-hidden="true"
        />
        <h1 className="fr-h3 fr-text-title--blue-france fr-mb-0">
          Inviter des membres
        </h1>
      </span>
    }
  >
    <span className="fr-text-mention--grey">
      Invitez des médiateurs et médiatrices numériques que vous souhaitez
      coordonner (avec un profil déjà créé ou non). Ils recevront une invitation
      par mail et devront accepter votre demande avant de rejoindre votre
      équipe.
    </span>
    <InviterMembreForm />
  </Card>
)
