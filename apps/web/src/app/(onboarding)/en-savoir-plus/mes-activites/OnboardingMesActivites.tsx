import Image from 'next/image'
import Onboarding from '../../_components/Onboarding'

export const OnboardingMesActivites = ({
  isConseillerNumerique,
}: {
  isConseillerNumerique: boolean
}) => (
  <Onboarding
    image={
      <Image
        className="fr-responsive-img"
        width={444}
        height={440}
        src="/images/illustrations/onboarding/mes-activites.svg"
        alt=""
      />
    }
    title="Enregistrez vos activités de médiation numérique"
    label={
      <>
        <span className="ri-service-line ri-lg fr-mr-1w" aria-hidden />
        Mes activités
      </>
    }
    stepIndex={1}
    totalSteps={isConseillerNumerique ? 6 : 5}
    next={{ href: '/en-savoir-plus/mes-statistiques' }}
    closeHref="/coop"
  >
    <p className="fr-text--lg">
      Grâce à des comptes rendus d’activités adaptés à{' '}
      <strong>3 types d’accompagnement</strong>&nbsp;:
    </p>
    <ul>
      <li>Accompagnement individuel</li>
      <li>Ateliers collectif</li>
      <li>Aide aux démarches administratives</li>
    </ul>
  </Onboarding>
)
