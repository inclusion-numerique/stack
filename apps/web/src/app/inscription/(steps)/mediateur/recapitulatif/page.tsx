import { redirect } from 'next/navigation'
import React from 'react'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import { getStructureEmployeuseForInscription } from '@app/web/app/inscription/getStructureEmployeuseForInscription'
import { getLieuxActiviteForInscription } from '@app/web/app/inscription/getLieuxActiviteForInscription'
import {
  mediateurInscriptionSteps,
  mediateurinscriptionStepsCount,
} from '@app/web/app/inscription/(steps)/mediateur/mediateurinscriptionSteps'
import InscriptionRecapitulatif from '@app/web/app/inscription/InscriptionRecapitulatif'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

// next js query params "profil": ProfilInscription
const Page = async () => {
  const user = await getAuthenticatedSessionUser()

  if (
    !user.profilInscription ||
    !user.mediateur ||
    user.mediateur.conseillerNumerique
  ) {
    redirect('/')
    return null
  }

  if (user.emplois.length === 0) {
    redirect(mediateurInscriptionSteps.lieuxActivites)
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
      backHref={mediateurInscriptionSteps.lieuxActivites}
      stepNumber={3}
      totalSteps={mediateurinscriptionStepsCount}
      subtitle="Vérifiez que ces informations sont exactes avant de valider votre inscription."
    >
      <InscriptionRecapitulatif
        editLieuxActiviteHref={mediateurInscriptionSteps.lieuxActivites}
        user={user}
        structureEmployeuse={emploi.structure}
        lieuxActivite={lieuxActivite}
      />
    </InscriptionCard>
  )
}

export default Page
