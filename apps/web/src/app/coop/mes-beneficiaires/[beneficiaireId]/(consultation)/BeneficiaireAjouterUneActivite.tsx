'use client'

import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Button from '@codegouvfr/react-dsfr/Button'
import CreateCraModalContent from '@app/web/app/coop/mon-activite/CreateCraModalContent'
import { BeneficiaireCraData } from '@app/web/beneficiaire/BeneficiaireValidation'

export const CreateCraBeneficiaireModalDefinition = createModal({
  id: 'create-cra-beneficiaire',
  isOpenedByDefault: false,
})

const BeneficiaireAjouterUneActivite = ({
  beneficiaire,
  displayName,
}: {
  beneficiaire: BeneficiaireCraData
  displayName: string
}) => (
  <>
    <Button
      iconId="fr-icon-user-add-line"
      onClick={CreateCraBeneficiaireModalDefinition.open}
    >
      Ajouter une activité
    </Button>
    <CreateCraBeneficiaireModalDefinition.Component
      title={`Ajouter une activité pour ${displayName}`}
    >
      <CreateCraModalContent
        craDefaultValues={{ beneficiaire }}
        atelier={false}
        onClose={CreateCraBeneficiaireModalDefinition.close}
      />
    </CreateCraBeneficiaireModalDefinition.Component>
  </>
)

export default BeneficiaireAjouterUneActivite
