import Image from 'next/image'
import Onboarding from '../../_components/Onboarding'

export const OnboardingMesBeneficiaires = ({
  isConseillerNumerique,
}: {
  isConseillerNumerique: boolean
}) => (
  <Onboarding
    image={
      <Image
        className="fr-responsive-img"
        width={505}
        height={444}
        src="/images/illustrations/onboarding/mes-beneficiaires.svg"
        alt=""
      />
    }
    title="Suivez l'évolution de vos bénéficiaires"
    label={
      <>
        <span className="ri-user-heart-line ri-lg fr-mr-1w" aria-hidden />
        Mes bénéficiaires
      </>
    }
    stepIndex={3}
    totalSteps={isConseillerNumerique ? 6 : 5}
    previous={{ href: '/en-savoir-plus/mes-statistiques' }}
    next={{ href: '/en-savoir-plus/mes-outils' }}
    closeHref="/coop"
  >
    <p className="fr-text--xl">
      Retrouvez l’historique d’accompagnement d’un bénéficiaire pour suivre son
      parcours complet vers l’autonomie avec notamment&nbsp;:
    </p>
    <ul>
      <li>Les thématiques vues lors des différents accompagnements</li>
      <li>L’évolution de son niveau d’autonomie</li>
    </ul>
  </Onboarding>
)
