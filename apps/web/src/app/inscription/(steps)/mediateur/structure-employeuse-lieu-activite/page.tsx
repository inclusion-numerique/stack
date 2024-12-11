import { redirect } from 'next/navigation'
import React from 'react'
import classNames from 'classnames'
import { metadataTitle } from '@app/web/app/metadataTitle'
import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import StructureCard from '@app/web/components/structure/StructureCard'
import {
  mediateurInscriptionSteps,
  mediateurinscriptionStepsCount,
} from '@app/web/app/inscription/(steps)/mediateur/mediateurinscriptionSteps'
import { getStructureEmployeuseForInscription } from '@app/web/app/inscription/getStructureEmployeuseForInscription'
import StructureEmployeuseLieuActiviteForm from '@app/web/app/inscription/(steps)/mediateur/structure-employeuse-lieu-activite/StructureEmployeuseLieuActiviteForm'
import { authenticateUser } from '@app/web/auth/authenticateUser'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

// next js query params "profil": ProfilInscription
const Page = async () => {
  const user = await authenticateUser()

  if (!user.mediateur || user.mediateur.conseillerNumerique) {
    redirect('/')
  }

  if (user.emplois.length === 0) {
    redirect(mediateurInscriptionSteps.structureEmployeuse)
  }

  const emploi = await getStructureEmployeuseForInscription({
    userId: user.id,
  })

  if (!emploi) {
    redirect(mediateurInscriptionSteps.structureEmployeuse)
  }

  const structure = {
    ...emploi.structure,
    // Should never happen as the siret is required in first step of inscription
    siret: emploi.structure.siret ?? '',
    codeInsee: emploi.structure.codeInsee ?? '',
  }

  return (
    <InscriptionCard
      title="Renseignez vos lieux d’activité"
      backHref={mediateurInscriptionSteps.structureEmployeuse}
      nextStepTitle="Récapitulatif de vos informations"
      stepNumber={2}
      totalSteps={mediateurinscriptionStepsCount}
    >
      <div
        className={classNames(
          'fr-mb-12v fr-px-6v fr-py-4v fr-width-full fr-border-radius--8 fr-background-alt--blue-france',
        )}
      >
        <p className="fr-text--bold fr-mb-1v">
          Est-ce que votre structure employeuse est également un de vos lieux
          d’activité&nbsp;?
        </p>
        <p className="fr-text--sm fr-mb-0">
          Vos lieux d’activité sont les lieux ou vous accueillez et accompagnez
          vos bénéficiaires (ex : lieu de permanence...)
        </p>
      </div>
      <StructureCard structure={structure} className="fr-mb-12v" />
      <StructureEmployeuseLieuActiviteForm
        userId={user.id}
        structureEmployeuseId={structure.id}
      />
    </InscriptionCard>
  )
}

export default Page
