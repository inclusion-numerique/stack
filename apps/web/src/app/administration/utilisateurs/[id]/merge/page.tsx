import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { prismaClient } from '@app/web/prismaClient'
import { getUserDisplayName } from '@app/web/utils/user'
import { notFound } from 'next/navigation'
import { MergeWithUser } from './MergeWithUser'

export const metadata = {
  title: metadataTitle('Utilisateurs - Fusion'),
}

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const user = await prismaClient.user.findUnique({
    where: { id },
  })

  if (!user) {
    notFound()
    return null
  }

  const name = getUserDisplayName(user)

  return (
    <CoopPageContainer>
      <AdministrationBreadcrumbs
        currentPage="Fusionner"
        parents={[
          {
            label: 'Utilisateurs',
            linkProps: { href: '/administration/utilisateurs' },
          },
          {
            label: name,
            linkProps: { href: `/administration/utilisateurs/${id}` },
          },
        ]}
      />
      <AdministrationTitle icon="fr-icon-git-merge-line">
        Fusionner {name} avec un autre utilisateur
      </AdministrationTitle>
      <MergeWithUser userId={id} />
    </CoopPageContainer>
  )
}

export default Page
