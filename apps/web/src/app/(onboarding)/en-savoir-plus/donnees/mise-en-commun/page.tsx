import { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import FullPageTwoColumnsWithIllustrationLayout from '@app/web/app/(onboarding)/FullPageTwoColumnsWithIllustrationLayout'
import { enSavoirPlusDonneesOnboardingSteps } from '@app/web/app/(onboarding)/en-savoir-plus/donnees/enSavoirPlusDonneesOnboarding'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('En savoir plus · Mise en commun'),
}

const Page = () => (
  <FullPageTwoColumnsWithIllustrationLayout
    illustrationSrc="/images/onboarding/mise-en-commun.svg"
    illustrationBackground="blue-france-975-75"
    illustrationMaxWidth={272}
    titleClassName="fr-text--xl"
    title="Une vision globale grâce à la mise en commun de données"
    stepIndex={3}
    totalSteps={enSavoirPlusDonneesOnboardingSteps}
    previousHref="/en-savoir-plus/donnees/cartographie"
    nextHref="/en-savoir-plus/donnees/en-evolution"
    closeHref="/donnees/choix-du-departement"
  >
    <p className="fr-text--xl fr-mb-4v">
      Différents services mais un seul objectif : offrir la vision la plus
      complète possible avec les données actuellement disponibles.
    </p>
    <p className="fr-text-mention--grey fr-text--xs">
      La Cartographie Nationale des lieux d’Inclusion Numérique, Conseiller
      Numérique France Services, Aidants Connect, Data Inclusion et l’Indice de
      fragilité numérique de la Mednum.
    </p>
  </FullPageTwoColumnsWithIllustrationLayout>
)

export default Page
