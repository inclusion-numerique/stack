import { Metadata } from 'next'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { metadataTitle } from '@app/web/app/metadataTitle'
import TwoPartOnboardingLayout from '@app/web/app/(onboarding)/TwoPartOnboardingLayout'
import AccederAuxDonneesForm from '@app/web/app/(onboarding)/acceder-aux-donnees/AccederAuxDonneesForm'
import { getDepartementOptions } from '@app/web/data/getDepartementOptions'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Accéder aux données'),
}

const AccederAuxDonneesPage = async () => {
  const departementOptions = await getDepartementOptions()
  return (
    <TwoPartOnboardingLayout
      illustrationSrc="/images/onboarding/france-map.svg"
      illustrationBackground="blue-france-975-75"
      illustrationMaxWidth={392}
      titleClassName="fr-text--xl"
    >
      <h1 className="fr-text--xl">
        Découvrir l’évolution des données publiques d’Inclusion Numérique dans
        mon département
      </h1>
      <Notice title="Vous pourrez également naviguer entre les différents départements à tout moment sur le tableau de bord." />

      <AccederAuxDonneesForm optionsDepartements={departementOptions} />
    </TwoPartOnboardingLayout>
  )
}

export default AccederAuxDonneesPage
