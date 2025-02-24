import MesActivitesVueSegmentedControl from '@app/web/app/coop/(sidemenu-layout)/mes-activites/(liste)/MesActivitesVueSegmentedControl'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import ActiviteDetailsModal from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsModal'
import { PropsWithChildren } from 'react'

const MesActivitesListeLayout = ({
  children,
  vue,
  empty,
}: PropsWithChildren<{ vue: 'liste' | 'tableau'; empty?: boolean }>) => (
  <CoopPageContainer size={794}>
    <CoopBreadcrumbs currentPage="Mes activités" />
    <div className="fr-mb-4v fr-width-full fr-flex fr-justify-content-space-between fr-align-items-center">
      <h1 className="fr-text-title--blue-france fr-mb-0">Mes activités</h1>
      {!empty && <MesActivitesVueSegmentedControl current={vue} />}
    </div>
    {children}
    <ActiviteDetailsModal />
  </CoopPageContainer>
)

export default MesActivitesListeLayout
