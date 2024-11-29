import Button from '@codegouvfr/react-dsfr/Button'
import { metadataTitle } from '@app/web/app/metadataTitle'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'

export const metadata = {
  title: metadataTitle('Usurpation'),
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = () => (
  <CoopPageContainer>
    <AdministrationBreadcrumbs currentPage="Outils" />
    <AdministrationTitle icon="fr-icon-settings-5-line">
      Outils
    </AdministrationTitle>

    <Button
      iconId="fr-icon-download-line"
      title="Télécharger la liste des utilisateurs de la V1 pour ProConnect"
      priority="secondary"
      linkProps={{
        href: '/api/proconnect/users.csv',
        download: true,
      }}
    >
      Télécharger la liste des utilisateurs de la V1 pour ProConnect
    </Button>
  </CoopPageContainer>
)

export default Page
