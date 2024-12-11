import { redirect } from 'next/navigation'
import React from 'react'
import { metadataTitle } from '@app/web/app/metadataTitle'
import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import { getStructureEmployeuseForInscription } from '@app/web/app/inscription/getStructureEmployeuseForInscription'
import { getLieuxActiviteForInscription } from '@app/web/app/inscription/getLieuxActiviteForInscription'
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

  const lieuxActivite = await getLieuxActiviteForInscription({
    mediateurId: user.mediateur.id,
  })

  return (
    <InscriptionCard
      title="Récapitulatif de vos informations"
      backHref={conseillerNumeriqueLieuxInscriptionSteps.lieuxActivite}
      subtitle="Vérifiez que ces informations sont exactes avant de valider votre inscription."
      stepNumber={3}
      totalSteps={conseillerNumeriqueLieuxInscriptionStepsCount}
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
        lieuxActivite={lieuxActivite}
        contactSupportLink
      />
    </InscriptionCard>
  )
}

export default Page
