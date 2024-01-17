import TwoPartOnboardingLayout from '@app/web/app/nouveautes/TwoPartOnboardingLayout'

const OnboardingSearchPage = () => (
  <TwoPartOnboardingLayout
    illustrationSrc="/images/onboarding/onboarding_search.svg"
    illustrationTop={208}
    illustrationLeft={80}
    illustrationBackground="blue-france-925-125"
    title="Une recherche simplifiée"
    icon="fr-icon-search-line"
    stepIndex={3}
    previousHref="/nouveautes/editeur"
    nextHref="/nouveautes/thematiques"
  >
    <ul>
      <li>Accédez immédiatement à des résultats grâce à la recherche rapide</li>
      <li>Une recherche et un système de filtre repensés</li>
    </ul>
  </TwoPartOnboardingLayout>
)

export default OnboardingSearchPage
