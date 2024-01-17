import TwoPartOnboardingLayout from '@app/web/app/nouveautes/TwoPartOnboardingLayout'
import { getSessionUser } from '@app/web/auth/getSessionUser'

const OnboardingMobilePage = async () => {
  const user = await getSessionUser()

  return (
    <TwoPartOnboardingLayout
      illustrationSrc="/images/onboarding/onboarding_mobile.svg"
      illustrationTop={128}
      illustrationLeft={148}
      illustrationBackground="blue-france-975-75"
      title="Consultez des ressources depuis votre mobile"
      icon="fr-icon-device-line"
      stepIndex={5}
      previousHref="/nouveautes/thematiques"
      user={user}
    >
      <ul>
        <li>Créez et publiez directement vos ressources</li>
        <li>Collectionnez des ressources</li>
        <li>
          Retrouvez les bases dont vous êtes membre pour collaborer à la
          création de ressources
        </li>
        <li>Suivez les bases & les profils qui vous intéressent</li>
      </ul>
    </TwoPartOnboardingLayout>
  )
}

export default OnboardingMobilePage
