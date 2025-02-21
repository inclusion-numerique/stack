import Onboarding from '@app/web/app/(onboarding)/_components/Onboarding'
import Image from 'next/image'

export const OnboardingMesStatistiquesCoordinateur = () => (
  <Onboarding
    image={
      <Image
        className="fr-responsive-img"
        width={572}
        height={769}
        src="/images/illustrations/onboarding/mes-statistiques.svg"
        alt=""
      />
    }
    title="Profitez de statistiques pour comprendre et suivre l’évolution de l'activité de votre équipe"
    label={
      <>
        <span className="ri-chat-poll-line ri-lg fr-mr-1w" aria-hidden />
        Mes statistiques
      </>
    }
    stepIndex={2}
    totalSteps={6}
    previous={{ href: '/en-savoir-plus/' }}
    next={{ href: '/en-savoir-plus/coordinateur/mon-equipe' }}
    closeHref="/coop"
  >
    <div className="fr-text--lg">
      <ul>
        <li>Filtrez-les par médiateurs, période, lieu et type d’activité.</li>
        <li>
          Exportez et partagez-les facilement auprès de différents partenaires
          (structure employeuse, lieux d’activités, collectivités…) pour
          valoriser votre travail.
        </li>
      </ul>
    </div>
  </Onboarding>
)
