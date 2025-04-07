import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import Button from '@codegouvfr/react-dsfr/Button'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import ApiClientsTable from '@app/web/app/administration/clients-api/ApiClientsTable'
import { getApiClientsListPageData } from '@app/web/app/administration/clients-api/getApiClientsListPageData'
import { metadataTitle } from '@app/web/app/metadataTitle'
import AdministrationPageContainer from '@app/web/app/administration/AdministrationPageContainer'

export const metadata = {
  title: metadataTitle('Clients API'),
}
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async () => {
  const data = await getApiClientsListPageData()

  return (
    <AdministrationPageContainer size="full">
      <AdministrationBreadcrumbs currentPage="Clients API" />
      <AdministrationTitle
        icon="ri-key-2-line"
        actions={
          <>
            <Button
              iconId="fr-icon-file-text-line"
              linkProps={{ href: '/api/v1/documentation', target: '_blank' }}
              className="fr-mr-2v"
              priority="secondary"
            >
              Documentation
            </Button>
            <Button
              iconId="fr-icon-add-line"
              linkProps={{ href: '/administration/clients-api/creer' }}
            >
              Ajouter un client API
            </Button>
          </>
        }
      >
        Clients API
      </AdministrationTitle>
      <ApiClientsTable
        data={data.apiClients}
        searchParams={{}}
        baseHref="/administration/clients-api"
      />
    </AdministrationPageContainer>
  )
}

export default Page
