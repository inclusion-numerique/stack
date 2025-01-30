'use client'

import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Button from '@codegouvfr/react-dsfr/Button'
import CreateCraModalContent from '@app/web/app/coop/(full-width-layout)/mes-activites/CreateCraModalContent'
import { BeneficiaireCraData } from '@app/web/beneficiaire/BeneficiaireValidation'
import { SessionUser } from '@app/web/auth/sessionUser'
import { hasFeatureFlag } from '@app/web/security/hasFeatureFlag'
import PrendreRendezVousAvecBeneficiaireButton from '@app/web/app/coop/(full-width-layout)/mon-profil/PrendreRendezVousAvecBeneficiaireButton'

export const CreateCraBeneficiaireModalDefinition = createModal({
  id: 'create-cra-beneficiaire',
  isOpenedByDefault: false,
})

const BeneficiaireAjouterUneActivite = ({
  beneficiaire,
  displayName,
  user,
}: {
  beneficiaire: BeneficiaireCraData
  displayName: string
  user: SessionUser | null
}) => {
  const canPrendreRendezVous =
    !!user && hasFeatureFlag(user, 'RdvServicePublic')

  return (
    <>
      {canPrendreRendezVous && beneficiaire.id ? (
        <div className="fr-flex fr-direction-column fr-flex-gap-2v">
          <Button
            iconId="fr-icon-add-line"
            onClick={CreateCraBeneficiaireModalDefinition.open}
          >
            Ajouter une activité
          </Button>
          <PrendreRendezVousAvecBeneficiaireButton
            beneficiaire={{ id: beneficiaire.id }}
            user={user}
            returnPath={`/coop/mes-beneficiaires/${beneficiaire.id}`}
          />
        </div>
      ) : (
        <Button
          iconId="fr-icon-add-line"
          onClick={CreateCraBeneficiaireModalDefinition.open}
        >
          Ajouter une activité
        </Button>
      )}
      <CreateCraBeneficiaireModalDefinition.Component
        title={`Ajouter une activité pour ${displayName}`}
      >
        <CreateCraModalContent
          retour={`/coop/mes-beneficiaires/${beneficiaire.id}/accompagnements`}
          craDefaultValues={{ beneficiaire }}
          atelier={false}
          onClose={CreateCraBeneficiaireModalDefinition.close}
        />
      </CreateCraBeneficiaireModalDefinition.Component>
    </>
  )
}

export default BeneficiaireAjouterUneActivite
