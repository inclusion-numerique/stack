import Image from 'next/image'
import Link from 'next/link'
import Onboarding from '../../_components/Onboarding'

export const OnboardingFranceNumeriqueEnsemble = ({
  isConseillerNumerique,
}: {
  isConseillerNumerique: boolean
}) => (
  <Onboarding
    image={
      <Image
        className="fr-responsive-img"
        width={404}
        height={430}
        src="/images/illustrations/onboarding/france-numerique-ensemble.svg"
        alt=""
      />
    }
    title="Contribuez à France Numérique Ensemble !"
    label={
      <Image
        width={32}
        height={32}
        src="/images/services/conseillers-numerique-logo-small.svg"
        alt=""
      />
    }
    stepIndex={5}
    totalSteps={isConseillerNumerique ? 6 : 5}
    previous={{ href: '/en-savoir-plus/mes-outils' }}
    next={
      isConseillerNumerique
        ? { href: '/en-savoir-plus/mes-archives' }
        : { href: '/coop', isComplete: true }
    }
    closeHref="/coop"
  >
    <p>
      Vos statistiques d’activités anonymisées contribuent à valoriser l’impact
      de la médiation numérique sur votre territoire.
    </p>
    <p>
      Les différents acteurs de l’inclusion numérique pourront ainsi suivre
      l’évolution et les effets des politiques publiques mises en place
      localement via l’
      <Link
        className="fr-link"
        href="https://inclusion-numerique.anct.gouv.fr/donnees/choix-du-departement"
        target="_blank"
        rel="noreferrer"
        title="France Numérique Ensemble - nouvel onglet"
      >
        Espace France Numérique Ensemble
      </Link>
      .
    </p>
  </Onboarding>
)
