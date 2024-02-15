import { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import FullPageTwoColumnsWithIllustrationLayout from '@app/web/app/(onboarding)/FullPageTwoColumnsWithIllustrationLayout'
import { enSavoirPlusDonneesOnboardingSteps } from '@app/web/app/(onboarding)/en-savoir-plus/donnees/enSavoirPlusDonneesOnboarding'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('En savoir plus · En évolution'),
}

const Page = () => (
  <FullPageTwoColumnsWithIllustrationLayout
    illustrationSrc="/images/onboarding/en-evolution.svg"
    illustrationBackground="blue-france-975-75"
    illustrationMaxWidth="50%"
    titleClassName="fr-text--xl"
    title="🚧 Un outil en construction !"
    stepIndex={4}
    totalSteps={enSavoirPlusDonneesOnboardingSteps}
    previousHref="/en-savoir-plus/donnees/mise-en-commun"
    nextHref="/donnees/choix-du-departement"
    closeHref="/donnees/choix-du-departement"
    nextLabel="Accéder"
  >
    <p className="fr-text--xl">
      Les données présentés à ce jour sont en cours d’évolution afin de vous
      offrir une vision toujours plus précise et représentative du déploiement
      des services d’Inclusion Numérique sur votre territoire.
    </p>
  </FullPageTwoColumnsWithIllustrationLayout>
)

export default Page
