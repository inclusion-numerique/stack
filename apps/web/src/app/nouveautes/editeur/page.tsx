import TwoPartOnboardingLayout from '@app/web/app/nouveautes/TwoPartOnboardingLayout'

const OnboardingEditorPage = () => (
  <TwoPartOnboardingLayout
    illustrationSrc="/images/onboarding/onboarding_editor.svg"
    illustrationTop={128}
    illustrationLeft={103}
    illustrationBackground="blue-france-925-125"
    title="Une création de ressource simplifiée"
    icon="fr-icon-edit-line"
    stepIndex={2}
    previousHref="/nouveautes/profil"
    nextHref="/nouveautes/recherche"
  >
    <ul>
      <li>Accédez directement à la création du contenu de votre ressource</li>
      <li>
        Des paramètres de publication simplifiés pour publier plus rapidement
      </li>
    </ul>
  </TwoPartOnboardingLayout>
)

export default OnboardingEditorPage
