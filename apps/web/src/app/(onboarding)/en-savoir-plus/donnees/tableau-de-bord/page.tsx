import { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import FullPageTwoColumnsWithIllustrationLayout from '@app/web/app/(onboarding)/FullPageTwoColumnsWithIllustrationLayout'
import { enSavoirPlusDonneesOnboardingSteps } from '@app/web/app/(onboarding)/en-savoir-plus/donnees/enSavoirPlusDonneesOnboarding'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('En savoir plus · Tableau de bord'),
}

const Page = () => (
  <FullPageTwoColumnsWithIllustrationLayout
    illustrationSrc="/images/onboarding/tableau-de-bord.svg"
    illustrationBackground="blue-france-975-75"
    illustrationMaxWidth="63%"
    titleClassName="fr-text--xl"
    title="Un tableau de bord"
    stepIndex={1}
    totalSteps={enSavoirPlusDonneesOnboardingSteps}
    nextHref="/en-savoir-plus/donnees/cartographie"
    closeHref="/donnees/choix-du-departement"
  >
    <p className="fr-text--xl">
      Présentant les lieux d’Inclusion numérique, le nombre d’aidants numériques
      identifiés, ainsi que des informations sur les bénéficiaires et les
      accompagnements réalisés.
    </p>
  </FullPageTwoColumnsWithIllustrationLayout>
)

export default Page
