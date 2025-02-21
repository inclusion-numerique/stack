import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import StructureEmployeuseLieuActiviteForm from '@app/web/app/inscription/(steps)/_components/structure-employeuse-lieu-activite/StructureEmployeuseLieuActiviteForm'
import { mediateurinscriptionStepsCount } from '@app/web/app/inscription/(steps)/mediateur/mediateurinscriptionSteps'
import { getStructureEmployeuseForInscription } from '@app/web/app/inscription/getStructureEmployeuseForInscription'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import StructureCard from '@app/web/components/structure/StructureCard'
import classNames from 'classnames'
import { redirect } from 'next/navigation'
import React from 'react'

export const StructureEmployeuseLieuActivitePage = async ({
  backHref,
  nextStep,
}: {
  backHref: string
  nextStep: string
}) => {
  const user = await authenticateUser()

  if (!user.mediateur) {
    redirect('/')
  }

  if (user.emplois.length === 0) {
    redirect(backHref)
  }

  const emploi = await getStructureEmployeuseForInscription({
    userId: user.id,
  })

  if (!emploi) {
    redirect(backHref)
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
      backHref={backHref}
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
          Vos lieux d’activité sont les lieux où vous accueillez et accompagnez
          vos bénéficiaires (ex : lieu de permanence...)
        </p>
      </div>
      <StructureCard structure={structure} className="fr-mb-12v" />
      <StructureEmployeuseLieuActiviteForm
        userId={user.id}
        structureEmployeuseId={structure.id}
        nextStep={nextStep}
      />
    </InscriptionCard>
  )
}
