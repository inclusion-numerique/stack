import { notFound } from 'next/navigation'
import { DefaultValues } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import { metadataTitle } from '@app/web/app/metadataTitle'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import AdministrationInfoCard from '@app/web/app/administration/AdministrationInfoCard'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import ClientApiForm from '@app/web/app/administration/clients-api/ClientApiForm'
import { prismaClient } from '@app/web/prismaClient'
import { ClientApiData } from '@app/web/app/administration/clients-api/ClientApiValidation'
import { dateAsIsoDay } from '@app/web/utils/dateAsIsoDay'
import GenerateUniqueClientApiSecretForm from '@app/web/app/administration/clients-api/RotateApiClientSecretForm'

export const metadata = {
  title: metadataTitle('Client API - Détails'),
}
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  await authenticateUser()

  const client = await prismaClient.apiClient.findUnique({
    where: {
      id,
    },
  })

  if (!client) {
    notFound()
    return null
  }

  const defaultValues: DefaultValues<ClientApiData> = {
    id: client.id,
    name: client.name,
    validFrom: dateAsIsoDay(client.validFrom),
    validUntil: client.validUntil ? dateAsIsoDay(client.validUntil) : undefined,
    scopes: client.scopes,
  }

  return (
    <CoopPageContainer>
      <AdministrationBreadcrumbs
        currentPage={client.name}
        parents={[
          {
            label: 'Clients API',
            linkProps: { href: '/administration/clients-api' },
          },
        ]}
      />
      <AdministrationTitle
        icon="ri-key-2-line"
        actions={
          <Button
            iconId="fr-icon-file-text-line"
            linkProps={{ href: '/api/v1/documentation', target: '_blank' }}
            className="fr-mr-2v"
            priority="secondary"
          >
            Documentation
          </Button>
        }
      >
        {client.name}
      </AdministrationTitle>

      <AdministrationInfoCard>
        <h2 className="fr-h4">Générer un token secret unique</h2>
        <GenerateUniqueClientApiSecretForm clientId={client.id} />
      </AdministrationInfoCard>

      <AdministrationInfoCard>
        <h2 className="fr-h4">Modifier le client API</h2>
        <ClientApiForm defaultValues={defaultValues} />
      </AdministrationInfoCard>
    </CoopPageContainer>
  )
}

export default Page
