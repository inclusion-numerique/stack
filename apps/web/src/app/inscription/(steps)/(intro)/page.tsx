import { redirect } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import { metadataTitle } from '@app/web/app/metadataTitle'
import type { ProfileInscriptionSlug } from '@app/web/inscription/profilInscription'
import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { checkInscriptionConseillerNumerique } from '@app/web/app/inscription/checkInscriptionConseillerNumerique'

export const metadata = {
  title: metadataTitle('Finaliser mon inscription'),
}

// next js query params "profil": ProfilInscription
const Page = async ({
  searchParams: { profil, check },
}: {
  searchParams: {
    profil?: ProfileInscriptionSlug
    check?: '1'
  }
}) => {
  if (!profil) {
    redirect('/')
  }

  const user = await getAuthenticatedSessionUser()

  const checkedUser =
    // We can force the check by adding the query param check=1
    !check && user.checkConseillerNumeriqueInscription
      ? user
      : await checkInscriptionConseillerNumerique(user)

  return (
    <InscriptionCard
      title="Finaliser votre inscription pour accéder à votre espace."
      titleClassName="fr-text-title--blue-france"
    >
      {checkedUser.mediateur?.conseillerNumerique ? (
        <div className="fr-border-radius--8 fr-background-alt--blue-france fr-flex-gap-4v fr-px-6v fr-py-4v fr-width-full fr-flex fr-justify-content-center fr-mb-12v">
          <img src="/images/services/conseillers-numerique-logo.svg" />
          <div>
            <p className="fr-text--bold fr-mb-1v">
              Vous avez été identifié en tant que conseiller numérique
            </p>
            <p className="fr-text-mention--grey fr-text--xs fr-mb-0">
              Source&nbsp;:{' '}
              <Link target="_blank" href="https://conseiller-numerique.gouv.fr">
                conseiller-numerique.gouv.fr
              </Link>
            </p>
          </div>
        </div>
      ) : null}
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
