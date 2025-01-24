import { PropsWithChildren } from 'react'
import { metadataTitle } from '@app/web/app/metadataTitle'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'

export const metadata = {
  title: metadataTitle('Statistiques'),
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

const AdministrationStatistiquesLayout = ({ children }: PropsWithChildren) => (
  <CoopPageContainer>
    <AdministrationBreadcrumbs currentPage="Statistiques" />
    <AdministrationTitle icon="fr-icon-line-chart-line">
      Statistiques
    </AdministrationTitle>
    {children}
  </CoopPageContainer>
)

export default AdministrationStatistiquesLayout
