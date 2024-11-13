import Image from 'next/image'
import Onboarding from '../../_components/Onboarding'

export const OnboardingMesStatistiques = ({
  isConseillerNumerique,
}: {
  isConseillerNumerique: boolean
}) => (
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
    title="Profitez de statistiques pour comprendre et suivre l’évolution de votre activité"
    label={
      <>
        <span className="ri-chat-poll-line ri-lg fr-mr-1w" aria-hidden />
        Mes statistiques
      </>
    }
    stepIndex={2}
    totalSteps={isConseillerNumerique ? 6 : 5}
    previous={{ href: '/en-savoir-plus/mes-activites' }}
    next={{ href: '/en-savoir-plus/mes-beneficiaires' }}
    closeHref="/coop"
  >
    <div className="fr-text--lg">
      <ul>
        <li>Filtrez-les par période, lieu et type d’activité.</li>
        <li>
          Exportez et partagez-les facilement auprès de différents partenaires
          (structure employeuse, lieux d’activités, collectivités…) pour
          valoriser votre travail.
        </li>
      </ul>
    </div>
  </Onboarding>
)
