import TwoPartOnboardingLayout from '@app/web/app/nouveautes/TwoPartOnboardingLayout'
import { getSessionUser } from '@app/web/auth/getSessionUser'

const OnboardingMobilePage = async () => {
  const user = await getSessionUser()

  return (
    <TwoPartOnboardingLayout
      illustrationSrc="/images/onboarding/onboarding_mobile.svg"
      illustrationTop={128}
      illustrationLeft="12.5%"
      illustrationRight="12.5%"
      illustrationBackground="blue-france-975-75"
      title="Consultez des ressources depuis votre mobile"
      icon="fr-icon-device-line"
      stepIndex={5}
      previousHref="/nouveautes/thematiques"
      user={user}
    >
      <p>
        La recherche, la consultation et l’enregistrement de ressources sont
        maintenant disponibles sur les appareils mobiles&nbsp;!
      </p>
    </TwoPartOnboardingLayout>
  )
}

export default OnboardingMobilePage
