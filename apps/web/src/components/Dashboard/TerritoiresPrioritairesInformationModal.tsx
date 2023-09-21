import { createModal } from '@codegouvfr/react-dsfr/Modal'
import React from 'react'

export const TerritoiresPrioritairesInformationModal = createModal({
  id: 'territoires-prioritaires-information',
  isOpenedByDefault: false,
})

export const TerritoiresPrioritairesInformationModalContent = () => (
  <TerritoiresPrioritairesInformationModal.Component title="Territoires prioritaires">
    <p>
      La maille communale retenue dans cette représentation limite la juste
      prise en compte des difficultés propres aux QPV. La représentation à
      l’IRIS proposée par la Mednum permet de mieux appréhender la vulnérabilité
      numérique des populations résidant dans ces territoires.
    </p>
  </TerritoiresPrioritairesInformationModal.Component>
)
