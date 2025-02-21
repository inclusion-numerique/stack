import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import {
  conseillerNumeriqueLieuxInscriptionSteps,
  conseillerNumeriqueLieuxInscriptionStepsCount,
} from '@app/web/app/inscription/(steps)/conseiller-numerique-lieux/conseillerNumeriqueLieuxInscriptionSteps'
import InscriptionRecapitulatif from '@app/web/app/inscription/InscriptionRecapitulatif'
import RoleInscriptionNotice from '@app/web/app/inscription/RoleInscriptionNotice'
import { getStructureEmployeuseForInscription } from '@app/web/app/inscription/getStructureEmployeuseForInscription'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { allProfileInscriptionLabels } from '@app/web/inscription/profilInscription'
import Button from '@codegouvfr/react-dsfr/Button'
import { redirect } from 'next/navigation'
import React from 'react'

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
        roleInscription={allProfileInscriptionLabels.ConseillerNumerique.toLocaleLowerCase()}
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
