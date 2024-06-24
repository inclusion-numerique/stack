import { redirect } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import Link from 'next/link'
import { metadataTitle } from '@app/web/app/metadataTitle'
import type { ProfileInscriptionSlug } from '@app/web/inscription/profilInscription'
import InscriptionCard from '@app/web/app/inscription/(steps)/InscriptionCard'
import { getAuthenticatedSessionUser } from '@app/web/auth/getSessionUser'
import { checkInscriptionConseillerNumerique } from '@app/web/app/inscription/checkInscriptionConseillerNumerique'
import { mediateurInscriptionSteps } from '@app/web/app/inscription/(steps)/mediateur/mediateurinscriptionSteps'
import { conseillerNumeriqueInscriptionSteps } from '@app/web/app/inscription/(steps)/conseiller-numerique/conseillerNumeriqueinscriptionSteps'
import { conseillerNumeriqueLieuxInscriptionSteps } from '@app/web/app/inscription/(steps)/conseiller-numerique-lieux/conseillerNumeriqueLieuxInscriptionSteps'
import { coordinateurInscriptionSteps } from '@app/web/app/inscription/(steps)/coordinateur/coordinateurInscriptionSteps'
import { getLieuxActiviteForInscription } from '@app/web/app/inscription/getLieuxActiviteForInscription'
import ConseillerNumeriqueInscriptionNotice from '@app/web/app/inscription/ConseillerNumeriqueInscriptionNotice'

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

  // Only fetch lieux activite if user is conseiller numerique to check which step to go to
  const lieuxActivite = user.mediateur?.conseillerNumerique
    ? await getLieuxActiviteForInscription({
        mediateurId: user.mediateur.id,
      })
    : []

  const nextStep = // Coordinateur
    checkedUser.coordinateur
      ? coordinateurInscriptionSteps.recapituatif
      : checkedUser.mediateur?.conseillerNumerique
        ? // Conseiller numérique with lieux activite
          lieuxActivite.length > 0
          ? conseillerNumeriqueInscriptionSteps.recapitulatif
          : // Conseiller numérique without lieux activite
            conseillerNumeriqueLieuxInscriptionSteps.lieuxActivites
        : // Mediateur
          mediateurInscriptionSteps.structureEmployeuse

  return (
    <InscriptionCard
      title="Finaliser votre inscription pour accéder à votre espace."
      titleClassName="fr-text-title--blue-france"
    >
      {checkedUser.mediateur?.conseillerNumerique ? (
        <ConseillerNumeriqueInscriptionNotice />
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
            href: nextStep,
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
