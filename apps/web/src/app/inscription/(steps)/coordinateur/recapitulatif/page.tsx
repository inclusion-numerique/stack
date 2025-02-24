import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import { mediateurinscriptionStepsCount } from '@app/web/app/inscription/(steps)/mediateur/mediateurinscriptionSteps'
import InscriptionRecapitulatif from '@app/web/app/inscription/InscriptionRecapitulatif'
import RoleInscriptionNotice from '@app/web/app/inscription/RoleInscriptionNotice'
import { getLieuxActiviteForInscription } from '@app/web/app/inscription/getLieuxActiviteForInscription'
import { getStructureEmployeuseForInscription } from '@app/web/app/inscription/getStructureEmployeuseForInscription'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { fetchConseillersCoordonnes } from '@app/web/external-apis/conseiller-numerique/fetchConseillersCoordonnes'
import { allProfileInscriptionLabels } from '@app/web/inscription/profilInscription'
import { redirect } from 'next/navigation'
import React from 'react'
import {
  coordinateurInscriptionSteps,
  coordinateurInscriptionStepsCount,
} from '../coordinateurInscriptionSteps'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

const Page = async () => {
  const user = await authenticateUser()

  if (!user.coordinateur) {
    redirect('/')
    return null
  }

  const emploi = await getStructureEmployeuseForInscription({
    userId: user.id,
  })

  if (!emploi) {
    throw new Error('No emploi found for conseiller numérique')
  }

  const lieuxActivite = user.mediateur?.id
    ? await getLieuxActiviteForInscription({
        mediateurId: user.mediateur.id,
      })
    : undefined

  const mediateursCoordonnes =
    user.coordinateur.conseillerNumeriqueId == null
      ? []
      : await fetchConseillersCoordonnes({
          coordinateurV1Id: user.coordinateur.conseillerNumeriqueId,
        })

  return (
    <InscriptionCard
      title="Récapitulatif de vos informations"
      backHref={
        user.mediateur?.id
          ? coordinateurInscriptionSteps.structureEmployeuseLieuActivite
          : coordinateurInscriptionSteps.accompagnement
      }
      subtitle="Vérifiez que ces informations sont exactes avant de valider votre inscription."
      stepNumber={
        user.mediateur?.id
          ? mediateurinscriptionStepsCount
          : coordinateurInscriptionStepsCount
      }
      totalSteps={
        user.mediateur?.id
          ? mediateurinscriptionStepsCount
          : coordinateurInscriptionStepsCount
      }
    >
      {user.coordinateur.conseillerNumeriqueId != null && (
        <RoleInscriptionNotice
          roleInscription={allProfileInscriptionLabels.Coordinateur.toLocaleLowerCase()}
          className="fr-mt-12v"
        />
      )}
      <InscriptionRecapitulatif
        editLieuxActiviteHref={coordinateurInscriptionSteps.lieuxActivite}
        user={user}
        structureEmployeuse={emploi.structure}
        mediateursCoordonnesCount={Math.max(
          mediateursCoordonnes.length,
          user.coordinateur.mediateursCoordonnes.length,
        )}
        lieuxActivite={lieuxActivite}
        contactSupportLink={user.coordinateur.conseillerNumeriqueId != null}
      />
    </InscriptionCard>
  )
}

export default Page
