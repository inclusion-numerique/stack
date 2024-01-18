import TwoPartOnboardingLayout from '@app/web/app/nouveautes/TwoPartOnboardingLayout'

const OnboardingProfilePage = () => (
  <TwoPartOnboardingLayout
    illustrationSrc="/images/onboarding/onboarding_profile.svg"
    illustrationTop={128}
    illustrationLeft={148}
    illustrationBackground="blue-france-925-125"
    title="Créez, publiez & collectionnez des ressources directement via votre profil"
    icon="fr-icon-account-line"
    stepIndex={1}
    nextHref="/nouveautes/editeur"
  >
    <ul>
      <li>Créez et publiez directement vos ressources</li>
      <li>Collectionnez des ressources</li>
      <li>
        Retrouvez les bases dont vous êtes membre pour collaborer à la création
        de ressources
      </li>
      <li>Suivez les bases & les profils qui vous intéressent</li>
    </ul>
  </TwoPartOnboardingLayout>
)

export default OnboardingProfilePage
