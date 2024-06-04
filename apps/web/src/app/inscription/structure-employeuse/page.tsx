import { redirect } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { ProfilInscription } from '@app/web/inscription/profilInscription'
import InscriptionCard from '@app/web/app/inscription/InscriptionCard'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

// next js query params "profil": ProfilInscription
const Page = async ({
  searchParams: { profil },
}: {
  searchParams: {
    profil?: ProfilInscription
  }
}) => {
  const user = await getAuthenticatedSessionUser()

  // TODO use user.emplois
  console.log(user.lastName)

  if (!profil) {
    redirect('/')
  }

  return (
    <InscriptionCard
      title="Renseignez votre structure employeuse"
      backHref={`/inscription?profil=${profil}`}
      nextStepTitle="Renseignez vos lieux d’activité"
      stepNumber={1}
    >
      🚧
      <div className="fr-btns-group">
        <Button
          className="fr-width-full fr-mb-6v"
          linkProps={{
            href: `/inscription/structure-employeuse?profil=${profil}`,
          }}
        >
          Suivant
        </Button>
      </div>
    </InscriptionCard>
  )
}

export default Page
