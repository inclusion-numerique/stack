import { metadataTitle } from '@app/web/app/metadataTitle'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import SearchConseillerNumeriqueByEmailForm from '@app/web/app/administration/integrations/conseillers-numerique/SearchConseillerNumeriqueByEmailForm'

export const metadata = {
  title: metadataTitle('Usurpation'),
}

const Page = () => (
  <div className="fr-container">
    <AdministrationBreadcrumbs currentPage="Conseillers numériques" />
    <h1 className="fr-h2 fr-text-title--blue-france fr-mb-8v">
      Conseillers numériques
    </h1>
    <p>
      Informations et diagnostics sur le système d’information du projet
      conseillers numérique
    </p>

    <SearchConseillerNumeriqueByEmailForm />
  </div>
)

export default Page
