import Notice from '@codegouvfr/react-dsfr/Notice'
import React from 'react'
import { metadataTitle } from '@app/web/app/metadataTitle'
import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import { coordinateurInscriptionSteps } from '../coordinateurInscriptionSteps'
import CoordinateurAndMediateur from './CoordinateurAndMediateur'

export const metadata = {
  title: metadataTitle('Réalisez-vous des accompagnements ?'),
}

const Page = () => (
  <InscriptionCard
    title="Réalisez-vous des accompagnements de médiation numérique ?"
    titleClassName="fr-text-title--blue-france fr-text--center"
    backHref={coordinateurInscriptionSteps.intro}
  >
    <div className="fr-text--center fr-text--lg">
      Afin de vous offrir un espace adapté à votre pratique, nous souhaitons
      savoir si, en plus de votre activité de coordination, vous intervenez
      directement sur le terrain auprès des bénéficiaires et, par conséquent, si
      vous êtes amené à compléter des comptes rendus d’activités de médiation
      numérique.
    </div>
    <Notice
      className="fr-notice--flex"
      title={
        <span className="fr-text--regular fr-text-default--grey fr-ml-1w">
          Si votre situation évolue, vous pourrez activer cette option à tout
          moment via les paramètres de votre profil.
        </span>
      }
    />
    <CoordinateurAndMediateur />
  </InscriptionCard>
)

export default Page
