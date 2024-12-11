import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import LieuxActiviteForm from '@app/web/app/inscription/LieuxActiviteForm'
import { getLieuxActiviteForInscription } from '@app/web/app/inscription/getLieuxActiviteForInscription'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { coordinateurInscriptionSteps } from '../coordinateurInscriptionSteps'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

const Page = async () => {
  const user = await authenticateUser()

  if (!user.mediateur) {
    redirect('/')
    return null
  }

  const lieuxActivite = await getLieuxActiviteForInscription({
    mediateurId: user.mediateur.id,
  })

  return (
    <InscriptionCard
      title="Renseignez vos lieux d’activité"
      backHref={coordinateurInscriptionSteps.recapitulatif}
      subtitle="Vos lieux d’activité sont les lieux ou vous accueillez et accompagnez vos bénéficiaires (e.g. : lieu de permanence...)"
    >
      <LieuxActiviteForm
        nextHref={coordinateurInscriptionSteps.recapitulatif}
        createStructureBackHref={coordinateurInscriptionSteps.lieuxActivite}
        defaultValues={{
          lieuxActivite,
          userId: user.id,
        }}
      />
    </InscriptionCard>
  )
}

export default Page
