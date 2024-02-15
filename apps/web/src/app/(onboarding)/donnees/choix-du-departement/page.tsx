import { Metadata } from 'next'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { metadataTitle } from '@app/web/app/metadataTitle'
import FullPageTwoColumnsWithIllustrationLayout from '@app/web/app/(onboarding)/FullPageTwoColumnsWithIllustrationLayout'
import { getDepartementOptions } from '@app/web/data/getDepartementOptions'
import ChoixDepartementForm from '@app/web/app/(onboarding)/donnees/choix-du-departement/ChoixDepartementForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Données départementales'),
}

const AccederAuxDonneesPage = async () => {
  const departementOptions = await getDepartementOptions()
  return (
    <FullPageTwoColumnsWithIllustrationLayout
      illustrationSrc="/images/home-map.svg"
      illustrationBackground="blue-france-975-75"
      illustrationMaxWidth="54.5%"
      titleClassName="fr-text--xl"
      closeHref="/"
      contentClassname="fr-flex fr-direction-column fr-flex-grow-1"
    >
      <h1 className="fr-text--xl">
        Découvrir l’évolution des données publiques d’Inclusion Numérique dans
        mon département
      </h1>
      <Notice title="Vous pourrez également naviguer entre les différents départements à tout moment sur le tableau de bord." />

      <ChoixDepartementForm optionsDepartements={departementOptions} />
    </FullPageTwoColumnsWithIllustrationLayout>
  )
}

export default AccederAuxDonneesPage
