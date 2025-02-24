import Onboarding from '@app/web/app/(onboarding)/_components/Onboarding'
import Image from 'next/image'

export const OnboardingMesArchivesCoordinateur = () => (
  <Onboarding
    image={
      <Image
        className="fr-responsive-img"
        width={476}
        height={437}
        src="/images/illustrations/onboarding/mes-archives.svg"
        alt=""
      />
    }
    title="Les données de l’Espace Coop V.1 ont été archivées"
    label={
      <>
        <span className="ri-archive-line ri-lg fr-mr-1w" aria-hidden />
        Mes archives - Coop V.1
      </>
    }
    stepIndex={4}
    totalSteps={6}
    previous={{ href: '/en-savoir-plus/coordinateur/mon-equipe' }}
    next={{ href: '/en-savoir-plus/coordinateur/mes-outils' }}
    closeHref="/coop"
  >
    <p className="fr-text--lg">
      Retrouvez l’historique des statistiques de la version précédente de
      l’espace Coop disponibles sous forme d’exports sur une page dédiée&nbsp;:{' '}
      <strong>Mes archives - Coop V.1</strong>.
    </p>
    <p className="fr-text--lg">
      Vous trouverez un export des statistiques pour chaque conseiller numérique
      que vous coordonnez.
    </p>
  </Onboarding>
)
