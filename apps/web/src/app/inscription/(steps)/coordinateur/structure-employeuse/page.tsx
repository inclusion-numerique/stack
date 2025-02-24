import { StructureEmployeusePage } from '@app/web/app/inscription/(steps)/_components/structure-employeuse/StructureEmployeusePage'
import { mediateurinscriptionStepsCount } from '@app/web/app/inscription/(steps)/mediateur/mediateurinscriptionSteps'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { redirect } from 'next/navigation'
import {
  coordinateurInscriptionSteps,
  coordinateurInscriptionStepsCount,
} from '../coordinateurInscriptionSteps'

export const metadata = {
  title: metadataTitle('Structure employeuse - Finaliser mon inscription'),
}

const Page = async () => {
  const user = await authenticateUser()

  if (!user.mediateur && !user.coordinateur) {
    redirect('/')
  }

  return (
    <StructureEmployeusePage
      backHref={coordinateurInscriptionSteps.intro}
      nextStepTitle={
        user.mediateur
          ? 'Renseignez vos lieux d’activité'
          : 'Récapitulatif de vos informations'
      }
      nextStep={
        user.mediateur
          ? coordinateurInscriptionSteps.structureEmployeuseLieuActivite
          : coordinateurInscriptionSteps.recapitulatif
      }
      totalSteps={
        user.mediateur
          ? mediateurinscriptionStepsCount
          : coordinateurInscriptionStepsCount
      }
    />
  )
}

export default Page
