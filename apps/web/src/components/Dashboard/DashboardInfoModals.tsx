import { createModal } from '@codegouvfr/react-dsfr/Modal'
import React from 'react'
import Link from 'next/link'
import InfoButton from '@app/web/components/InfoButton'

const CoordinateursConseillerNumeriqueInformationsModal = createModal({
  id: 'coordinateurs-conseiller-numerique-informations-modal',
  isOpenedByDefault: false,
})
const ConseillerNumeriqueInformationsModal = createModal({
  id: 'conseiller-numerique-informations-modal',
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

const ConseillerNumeriqueInformationsModalButton = () => (
  <>
    <ConseillerNumeriqueInformationsModal.Component title="Conseillers Numérique en poste">
      <p>
        Nombre de Conseillers Numérique en poste ayant renseigné leur lieu de
        permanence
        <br />
        <br />
        <Link
          href="https://www.conseiller-numerique.gouv.fr/carte"
          target="_blank"
        >
          La cartographie consultable via ce lien
        </Link>{' '}
        permet de localiser les Conseillers Numérique sur le territoire.
      </p>
    </ConseillerNumeriqueInformationsModal.Component>
    <InfoButton
      iconId="fr-icon-information-line"
      title="Nombre de Conseillers Numérique en poste ayant renseigné leur lieu de permanence"
      onClick={ConseillerNumeriqueInformationsModal.open}
    />
  </>
)

export const DashboardInfoButtons = {
  coordinateursConseillerNumerique:
    CoordinateursConseillerNumeriqueInformationsModalButton,
  conseillerNumerique: ConseillerNumeriqueInformationsModalButton,
}

export type DashboardInfoButtonsId = keyof typeof DashboardInfoButtons
