import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import Notice from '@codegouvfr/react-dsfr/Notice'
import React from 'react'
import { coordinateurInscriptionSteps } from '../coordinateurInscriptionSteps'
import CoordinateurAndMediateur from './CoordinateurAndMediateur'

export const metadata = {
  title: metadataTitle('Réalisez-vous des accompagnements ?'),
}

const Page = async () => {
  const user = await authenticateUser()

  return (
    <InscriptionCard
      title="Êtes-vous également médiateur numérique ?"
      titleClassName="fr-text-title--blue-france fr-text--center"
      backHref={coordinateurInscriptionSteps.intro}
    >
      <div className="fr-text--center fr-text--lg">
        Afin de vous offrir un espace adapté à votre pratique, nous souhaitons
        savoir si, en plus de votre activité de coordination, vous réalisez
        également des accompagnements de médiation numérique auprès de
        bénéficiaires ?
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
      <CoordinateurAndMediateur
        horsDispositif={user.coordinateur?.conseillerNumeriqueId == null}
      />
    </InscriptionCard>
  )
}

export default Page
