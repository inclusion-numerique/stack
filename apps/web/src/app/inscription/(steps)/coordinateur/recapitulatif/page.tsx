import { redirect } from 'next/navigation'
import React from 'react'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import { getStructureEmployeuseForInscription } from '@app/web/app/inscription/getStructureEmployeuseForInscription'
import RoleInscriptionNotice from '@app/web/app/inscription/RoleInscriptionNotice'
import { conseillerNumeriqueLieuxInscriptionStepsCount } from '@app/web/app/inscription/(steps)/conseiller-numerique-lieux/conseillerNumeriqueLieuxInscriptionSteps'
import { coordinateurInscriptionSteps } from '../coordinateurInscriptionSteps'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

// next js query params "profil": ProfilInscription
const Page = async () => {
  const user = await getAuthenticatedSessionUser()

  if (!user.mediateur || !user.mediateur.conseillerNumerique) {
    redirect('/')
    return null
  }

  const emploi = await getStructureEmployeuseForInscription({
    userId: user.id,
  })

  console.log(emploi)

  // if (!emploi) {
  //   throw new Error('No emploi found for conseiller numérique')
  // }
  //
  // const lieuxActivite = await getLieuxActiviteForInscription({
  //   mediateurId: user.mediateur.id,
  // })

  return (
    <InscriptionCard
      title="Récapitulatif de vos informations"
      backHref={coordinateurInscriptionSteps.accompagnement}
      subtitle="Vérifiez que ces informations sont exactes avant de valider votre inscription."
      totalSteps={conseillerNumeriqueLieuxInscriptionStepsCount}
    >
      <RoleInscriptionNotice
        roleInscription="coordinateur de conseiller numérique"
        className="fr-mt-12v"
      />
      {/* <InscriptionRecapitulatif */}
      {/*  editLieuxActiviteHref={ */}
      {/*    conseillerNumeriqueLieuxInscriptionSteps.lieuxActivite */}
      {/*  } */}
      {/*  user={user} */}
      {/*  structureEmployeuse={emploi.structure} */}
      {/*  lieuxActivite={lieuxActivite} */}
      {/*  contactSupportLink */}
      {/* /> */}
    </InscriptionCard>
  )
}

export default Page
