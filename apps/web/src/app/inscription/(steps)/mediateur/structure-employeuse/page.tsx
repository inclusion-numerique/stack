import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import RenseignerStructureEmployeuseForm from '@app/web/app/inscription/(steps)/mediateur/structure-employeuse/RenseignerStructureEmployeuseForm'
import {
  mediateurInscriptionSteps,
  mediateurinscriptionStepsCount,
} from '@app/web/app/inscription/(steps)/mediateur/mediateurinscriptionSteps'
import { getStructureEmployeuseForInscription } from '@app/web/app/inscription/getStructureEmployeuseForInscription'
import { authenticateUser } from '@app/web/auth/authenticateUser'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

const Page = async () => {
  const user = await authenticateUser()

  if (!user.mediateur || user.mediateur.conseillerNumerique) {
    redirect('/')
  }

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
      backHref={mediateurInscriptionSteps.intro}
      nextStepTitle="Renseignez vos lieux d’activité"
      stepNumber={1}
      totalSteps={mediateurinscriptionStepsCount}
    >
      <RenseignerStructureEmployeuseForm
        defaultValues={{
          structureEmployeuse: structureEmployeuse ?? undefined,
          userId: user.id,
        }}
        structureEmployeuse={structureEmployeuse}
      />
    </InscriptionCard>
  )
}

export default Page
