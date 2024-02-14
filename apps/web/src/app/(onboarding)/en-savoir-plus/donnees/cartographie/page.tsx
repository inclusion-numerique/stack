import { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import FullPageTwoColumnsWithIllustrationLayout from '@app/web/app/(onboarding)/FullPageTwoColumnsWithIllustrationLayout'
import { enSavoirPlusDonneesOnboardingSteps } from '@app/web/app/(onboarding)/en-savoir-plus/donnees/enSavoirPlusDonneesOnboarding'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('En savoir plus · Cartographie'),
}

const Page = () => (
  <FullPageTwoColumnsWithIllustrationLayout
    illustrationSrc="/images/onboarding/cartographie.svg"
    illustrationBackground="blue-france-975-75"
    illustrationMaxWidth={570}
    titleClassName="fr-text--xl"
    title="Une cartographie"
    stepIndex={2}
    totalSteps={enSavoirPlusDonneesOnboardingSteps}
    previousHref="/en-savoir-plus/donnees/tableau-de-bord"
    nextHref="/en-savoir-plus/donnees/mise-en-commun"
    closeHref="/donnees/choix-du-departement"
  >
    <p className="fr-text--xl">
      Pour visualiser la répartition{' '}
      <strong>à l’échelle d’un département</strong> des lieux d’Inclusion
      Numérique. Vous pouvez également afficher{' '}
      <strong>l’Indice de Fragilité Numérique</strong> proposé par la Mednum
      pour identifier les zones géographiques où il existe un risque accru de
      fragilité numérique.
    </p>
  </FullPageTwoColumnsWithIllustrationLayout>
)

export default Page
