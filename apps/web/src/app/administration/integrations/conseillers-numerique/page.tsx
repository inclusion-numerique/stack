import { metadataTitle } from '@app/web/app/metadataTitle'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import SearchConseillerNumeriqueByEmailForm from '@app/web/app/administration/integrations/conseillers-numerique/SearchConseillerNumeriqueByEmailForm'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'

export const metadata = {
  title: metadataTitle('Usurpation'),
}

const Page = () => (
  <CoopPageContainer>
    <AdministrationBreadcrumbs currentPage="Conseillers numériques" />
    <AdministrationTitle icon="fr-icon-links-line">
      Conseillers numériques
    </AdministrationTitle>
    <p>
      Informations et diagnostics sur le système d’information du projet
      conseillers numérique
    </p>

    <SearchConseillerNumeriqueByEmailForm />
  </CoopPageContainer>
)

export default Page
