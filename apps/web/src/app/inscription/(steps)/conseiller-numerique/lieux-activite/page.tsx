import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import LieuxActiviteForm from '@app/web/app/inscription/LieuxActiviteForm'
import { getLieuxActiviteForInscription } from '@app/web/app/inscription/getLieuxActiviteForInscription'
import { conseillerNumeriqueInscriptionSteps } from '@app/web/app/inscription/(steps)/conseiller-numerique/conseillerNumeriqueinscriptionSteps'
import { authenticateUser } from '@app/web/auth/authenticateUser'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

const Page = async () => {
  const user = await authenticateUser()

  if (!user.mediateur || !user.mediateur.conseillerNumerique) {
    redirect('/')
    return null
  }

  const lieuxActivite = await getLieuxActiviteForInscription({
    mediateurId: user.mediateur.id,
  })

  return (
    <InscriptionCard
      title="Renseignez vos lieux d’activité"
      backHref={conseillerNumeriqueInscriptionSteps.recapitulatif}
      subtitle="Vos lieux d’activité sont les lieux ou vous accueillez et accompagnez vos bénéficiaires (e.g. : lieu de permanence...)"
    >
      <LieuxActiviteForm
        nextHref={conseillerNumeriqueInscriptionSteps.recapitulatif}
        createStructureBackHref={
          conseillerNumeriqueInscriptionSteps.lieuxActivite
        }
        defaultValues={{
          lieuxActivite,
          userId: user.id,
        }}
      />
    </InscriptionCard>
  )
}

export default Page
