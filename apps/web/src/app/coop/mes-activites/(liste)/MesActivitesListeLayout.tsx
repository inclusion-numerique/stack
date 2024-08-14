import { PropsWithChildren } from 'react'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'
import MesActivitesVueSegmentedControl from '@app/web/app/coop/mes-activites/(liste)/MesActivitesVueSegmentedControl'
import ActiviteDetailsModal from '@app/web/components/activite/ActiviteDetailsModal/ActiviteDetailsModal'

const MesActivitesListeLayout = ({
  children,
  vue,

  empty,
}: PropsWithChildren<{ vue: 'liste' | 'tableau'; empty?: boolean }>) => (
  <CoopPageContainer size={794} className="fr-pt-8v">
    <CoopBreadcrumbs currentPage="Mes activités" />
    <div className="fr-mb-4v fr-width-full fr-flex fr-justify-content-space-between fr-align-items-center">
      <h1 className="fr-text-title--blue-france fr-mb-0">Mes activités</h1>
      {!empty && <MesActivitesVueSegmentedControl current={vue} />}
    </div>
    <div className="fr-flex fr-flex-gap-4v fr-align-items-center fr-mb-8v">
      TODO FILTRES
    </div>
    {children}
    <ActiviteDetailsModal />
  </CoopPageContainer>
)

export default MesActivitesListeLayout
