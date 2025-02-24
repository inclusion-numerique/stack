import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import { conseillerNumeriqueLieuxInscriptionStepsCount } from '@app/web/app/inscription/(steps)/conseiller-numerique-lieux/conseillerNumeriqueLieuxInscriptionSteps'
import { conseillerNumeriqueInscriptionSteps } from '@app/web/app/inscription/(steps)/conseiller-numerique/conseillerNumeriqueinscriptionSteps'
import InscriptionRecapitulatif from '@app/web/app/inscription/InscriptionRecapitulatif'
import RoleInscriptionNotice from '@app/web/app/inscription/RoleInscriptionNotice'
import { getLieuxActiviteForInscription } from '@app/web/app/inscription/getLieuxActiviteForInscription'
import { getStructureEmployeuseForInscription } from '@app/web/app/inscription/getStructureEmployeuseForInscription'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { allProfileInscriptionLabels } from '@app/web/inscription/profilInscription'
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

  const lieuxActivite = await getLieuxActiviteForInscription({
    mediateurId: user.mediateur.id,
  })

  return (
    <InscriptionCard
      title="Récapitulatif de vos informations"
      backHref={conseillerNumeriqueInscriptionSteps.intro}
      subtitle="Vérifiez que ces informations sont exactes avant de valider votre inscription."
      stepNumber={3}
      totalSteps={conseillerNumeriqueLieuxInscriptionStepsCount}
    >
      <RoleInscriptionNotice
        roleInscription={allProfileInscriptionLabels.ConseillerNumerique.toLocaleLowerCase()}
        className="fr-mt-12v"
      />
      <InscriptionRecapitulatif
        editLieuxActiviteHref={
          conseillerNumeriqueInscriptionSteps.lieuxActivite
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
