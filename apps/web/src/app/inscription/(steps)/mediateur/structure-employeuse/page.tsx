import { StructureEmployeusePage } from '@app/web/app/inscription/(steps)/_components/structure-employeuse/StructureEmployeusePage'
import {
  mediateurInscriptionSteps,
  mediateurinscriptionStepsCount,
} from '@app/web/app/inscription/(steps)/mediateur/mediateurinscriptionSteps'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { redirect } from 'next/navigation'

export const metadata = {
  title: metadataTitle('Structure employeuse - Finaliser mon inscription'),
}

const Page = async () => {
  const user = await authenticateUser()

  if (!user.mediateur || user.mediateur.conseillerNumerique) {
    redirect('/')
  }

  return (
    <StructureEmployeusePage
      backHref={mediateurInscriptionSteps.intro}
      nextStepTitle="Renseignez vos lieux d’activité"
      nextStep={mediateurInscriptionSteps.structureEmployeuseLieuActivite}
      totalSteps={mediateurinscriptionStepsCount}
    />
  )
}

export default Page
