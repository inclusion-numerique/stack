import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import {
  mediateurInscriptionSteps,
  mediateurinscriptionStepsCount,
} from '@app/web/app/inscription/(steps)/mediateur/mediateurinscriptionSteps'
import InscriptionRecapitulatif from '@app/web/app/inscription/InscriptionRecapitulatif'
import { getLieuxActiviteForInscription } from '@app/web/app/inscription/getLieuxActiviteForInscription'
import { getStructureEmployeuseForInscription } from '@app/web/app/inscription/getStructureEmployeuseForInscription'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

// next js query params "profil": ProfilInscription
const Page = async () => {
  const user = await authenticateUser()

  if (!user.mediateur || user.mediateur.conseillerNumerique) {
    redirect('/')
    return null
  }

  if (user.emplois.length === 0) {
    redirect(mediateurInscriptionSteps.lieuxActivite)
    return null
  }

  const emploi = await getStructureEmployeuseForInscription({
    userId: user.id,
  })

  if (!emploi) {
    redirect(mediateurInscriptionSteps.structureEmployeuse)
    return null
  }

  const lieuxActivite = await getLieuxActiviteForInscription({
    mediateurId: user.mediateur.id,
  })

  return (
    <InscriptionCard
      title="Récapitulatif de vos informations"
      backHref={mediateurInscriptionSteps.lieuxActivite}
      stepNumber={3}
      totalSteps={mediateurinscriptionStepsCount}
      subtitle="Vérifiez que ces informations sont exactes avant de valider votre inscription."
    >
      <InscriptionRecapitulatif
        editLieuxActiviteHref={mediateurInscriptionSteps.lieuxActivite}
        user={user}
        structureEmployeuse={emploi.structure}
        lieuxActivite={lieuxActivite}
      />
    </InscriptionCard>
  )
}

export default Page
