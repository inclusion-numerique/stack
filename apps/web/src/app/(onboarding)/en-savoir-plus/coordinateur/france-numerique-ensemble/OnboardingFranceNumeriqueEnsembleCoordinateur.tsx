import Image from 'next/image'
import Link from 'next/link'
import Onboarding from '@app/web/app/(onboarding)/_components/Onboarding'

export const OnboardingFranceNumeriqueEnsembleCoordinateur = () => (
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
    stepIndex={6}
    totalSteps={6}
    previous={{ href: '/en-savoir-plus/coordinateur/mes-outils' }}
    next={{ href: '/coop', isComplete: true }}
    closeHref="/coop"
  >
    <p className="fr-text--lg">
      Les statistiques d’activités anonymisées de votre équipe contribuent à
      valoriser l’impact de la médiation numérique sur votre territoire.
    </p>
    <p className="fr-text--lg">
      Les différents acteurs de l’inclusion numérique pourront ainsi suivre
      l’évolution et les effets des politiques publiques mises en place
      localement via l’
      <Link
        className="fr-link fr-text--lg"
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
