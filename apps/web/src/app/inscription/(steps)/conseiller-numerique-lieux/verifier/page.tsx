import { redirect } from 'next/navigation'
import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { metadataTitle } from '@app/web/app/metadataTitle'
import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import { getStructureEmployeuseForInscription } from '@app/web/app/inscription/getStructureEmployeuseForInscription'
import RoleInscriptionNotice from '@app/web/app/inscription/RoleInscriptionNotice'
import InscriptionRecapitulatif from '@app/web/app/inscription/InscriptionRecapitulatif'
import {
  conseillerNumeriqueLieuxInscriptionSteps,
  conseillerNumeriqueLieuxInscriptionStepsCount,
} from '@app/web/app/inscription/(steps)/conseiller-numerique-lieux/conseillerNumeriqueLieuxInscriptionSteps'
import { profileInscriptionLabels } from '@app/web/inscription/profilInscription'
import { authenticateUser } from '@app/web/auth/authenticateUser'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

// next js query params "profil": ProfilInscription
const Page = async () => {
  const user = await authenticateUser()

  if (!user.mediateur || !user.mediateur.conseillerNumerique) {
    redirect('/')
    return null
  }

  const emploi = await getStructureEmployeuseForInscription({
    userId: user.id,
  })

  if (!emploi) {
    throw new Error('No emploi found for conseiller numérique')
  }

  return (
    <InscriptionCard
      title="Vérifiez vos informations"
      stepNumber={1}
      totalSteps={conseillerNumeriqueLieuxInscriptionStepsCount}
      nextStepTitle="Renseignez vos lieux d’activité"
      backHref={conseillerNumeriqueLieuxInscriptionSteps.intro}
    >
      <RoleInscriptionNotice
        roleInscription={profileInscriptionLabels.ConseillerNumerique.toLocaleLowerCase()}
        className="fr-mt-12v"
      />
      <InscriptionRecapitulatif
        editLieuxActiviteHref={
          conseillerNumeriqueLieuxInscriptionSteps.lieuxActivite
        }
        user={user}
        structureEmployeuse={emploi.structure}
        contactSupportLink
        button={
          <div className="fr-btns-group">
            <Button
              linkProps={{
                href: conseillerNumeriqueLieuxInscriptionSteps.lieuxActivite,
              }}
            >
              Valider
            </Button>
          </div>
        }
      />
    </InscriptionCard>
  )
}

export default Page
