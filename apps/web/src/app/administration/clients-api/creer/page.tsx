import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationInfoCard from '@app/web/app/administration/AdministrationInfoCard'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import ClientApiForm from '@app/web/app/administration/clients-api/ClientApiForm'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { authenticateUser } from '@app/web/auth/authenticateUser'

export const metadata = {
  title: metadataTitle('Clients API - Créer'),
}
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async () => {
  await authenticateUser()

  return (
    <CoopPageContainer>
      <AdministrationBreadcrumbs
        currentPage="Créer un client API"
        parents={[
          {
            label: 'Clients API',
            linkProps: { href: '/administration/clients-api' },
          },
        ]}
      />
      <AdministrationTitle icon="ri-key-2-line">
        Créer un client API
      </AdministrationTitle>

      <AdministrationInfoCard>
        <ClientApiForm />
      </AdministrationInfoCard>
    </CoopPageContainer>
  )
}

export default Page
