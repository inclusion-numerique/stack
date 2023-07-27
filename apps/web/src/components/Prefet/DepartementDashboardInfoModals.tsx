import { createModal } from '@codegouvfr/react-dsfr/Modal'
import React from 'react'
import Link from 'next/link'
import InfoButton from '@app/web/components/InfoButton'

const CoordinateursConseillerNumeriqueInformationsModal = createModal({
  id: 'coordinateurs-conseiller-numerique-informations-modal',
  isOpenedByDefault: false,
})

const CoordinateursConseillerNumeriqueInformationsModalButton = () => (
  <>
    <CoordinateursConseillerNumeriqueInformationsModal.Component title="Conseillers coordinateurs">
      <p>
        Le déploiement rapide du dispositif Conseiller numérique a fait émerger
        un fort besoin de coordination et d’animation de leur réseau au sein des
        territoires. Ce constat a mené à la création de postes de Conseillers
        numériques coordinateurs, dont l’action s’est avérée très positive.
        <br />
        <br />
        <Link
          href="https://www.conseiller-numerique.gouv.fr/coordination-territoriale"
          target="_blank"
        >
          La cartographie consultable via ce lien
        </Link>{' '}
        permet de localiser les Conseillers numériques coordinateurs et
        d’identifier leurs périmètres de compétence.
      </p>
    </CoordinateursConseillerNumeriqueInformationsModal.Component>
    <InfoButton
      iconId="fr-icon-information-line"
      title="Informations sur les coordinateurs conseiller numérique"
      onClick={CoordinateursConseillerNumeriqueInformationsModal.open}
    />
  </>
)

export const DepartementDashboardInfoButtons = {
  coordinateursConseillerNumerique:
    CoordinateursConseillerNumeriqueInformationsModalButton,
}

export type DepartementDashboardInfoButtonsId =
  keyof typeof DepartementDashboardInfoButtons
