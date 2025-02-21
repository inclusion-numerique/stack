import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import { getStructureEmployeuseForInscription } from '@app/web/app/inscription/getStructureEmployeuseForInscription'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import RenseignerStructureEmployeuseForm from './RenseignerStructureEmployeuseForm'

export const metadata = {
  title: metadataTitle('Structure employeuse - Finaliser mon inscription'),
}

export const StructureEmployeusePage = async ({
  backHref,
  nextStepTitle,
  nextStep,
  totalSteps,
}: {
  backHref: string
  nextStepTitle: string
  nextStep: string
  totalSteps: number
}) => {
  const user = await authenticateUser()

  const emploi = await getStructureEmployeuseForInscription({
    userId: user.id,
  })

  const structure = emploi?.structure

  const structureEmployeuse = structure
    ? {
        ...structure,
        // Those casts should not happen as in creation they are required. This is for type safety
        codeInsee: structure.codeInsee ?? '',
        siret: structure.siret ?? '',
      }
    : null

  return (
    <InscriptionCard
      title="Renseignez votre structure employeuse"
      backHref={backHref}
      nextStepTitle={nextStepTitle}
      stepNumber={1}
      totalSteps={totalSteps}
    >
      <RenseignerStructureEmployeuseForm
        nextStep={nextStep}
        defaultValues={{
          structureEmployeuse: structureEmployeuse ?? undefined,
          userId: user.id,
        }}
        structureEmployeuse={structureEmployeuse}
      />
    </InscriptionCard>
  )
}
