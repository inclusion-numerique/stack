import { redirect } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { profileInscriptionSlugs } from '@app/web/inscription/profilInscription'
import CreerStructurePageContent from '@app/web/app/inscription/creer-un-lieu-d-activite/CreerStructurePageContent'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

// next js query params "profil": ProfilInscription
const Page = async ({
  searchParams: { nom },
}: {
  searchParams: {
    nom?: string
  }
}) => {
  const user = await getAuthenticatedSessionUser()

  if (!user.profilInscription || !user.mediateur) {
    redirect('/')
  }

  if (user.emplois.length === 0) {
    redirect(
      `/inscription/structure-employeuse?profil=${profileInscriptionSlugs[user.profilInscription]}`,
    )
  }

  return (
    <div className="fr-width-full">
      <CreerStructurePageContent
        backLinkHref="/inscription/lieux-activite"
        backLinkTitle="Retour aux lieux d’activité"
        lieuActiviteMediateurId={user.mediateur.id}
        title="Lieu d’activité"
        defaultValues={{ nom }}
      />
    </div>
  )
}

export default Page
