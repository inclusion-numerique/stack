import { redirect } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import { metadataTitle } from '@app/web/app/metadataTitle'
import type { ProfileInscriptionSlug } from '@app/web/inscription/profilInscription'
import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

// next js query params "profil": ProfilInscription
const Page = ({
  searchParams: { profil },
}: {
  searchParams: {
    profil?: ProfileInscriptionSlug
  }
}) => {
  if (!profil) {
    redirect('/')
  }

  return (
    <InscriptionCard
      title="Finaliser votre inscription pour accéder à votre espace."
      titleClassName="fr-text-title--blue-france"
    >
      <p className="fr-mb-12v wip">
        Afin de profiter de la Coop des médiateurs numériques, nous avons besoin
        de connaitre votre structure employeuse ainsi que vos lieux d’activités
        afin de ...
      </p>
      <div className="fr-btns-group">
        <Button
          className="fr-width-full fr-mb-6v"
          linkProps={{
            href: `/inscription/structure-employeuse?profil=${profil}`,
          }}
        >
          Commencer
        </Button>
      </div>
      <div className="fr-width-full fr-text--center">
        <Link className="fr-link fr-mb-0 " href="/">
          Revenir plus tard
        </Link>
      </div>
    </InscriptionCard>
  )
}

export default Page
