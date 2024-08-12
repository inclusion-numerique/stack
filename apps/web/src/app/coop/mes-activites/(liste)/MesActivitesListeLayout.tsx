import Button from '@codegouvfr/react-dsfr/Button'
import { PropsWithChildren } from 'react'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import CoopBreadcrumbs from '@app/web/app/coop/CoopBreadcrumbs'

const MesActivitesListeLayout = ({
  children,
  vue,
}: PropsWithChildren<{ vue: 'liste' | 'tableau' }>) => (
  <CoopPageContainer size={794} className="fr-pt-8v">
    <CoopBreadcrumbs currentPage="Mes activités" />
    <div className="fr-mb-4v fr-width-full fr-flex fr-justify-content-space-between fr-align-items-center">
      <h1 className="fr-text-title--blue-france fr-mb-0">Mes activités</h1>
      {/*TODO is there a "nav" toggle for this ?
      https://www.figma.com/design/tHjoZOsfnmtPK9woxWkeLc/La-Coop-de-la-m%C3%A9diation-num%C3%A9rique?node-id=8734-118548&m=dev
      */}
      <Button
        iconId="fr-icon-user-add-line"
        linkProps={{
          href: '/coop/mes-activites',
        }}
        className="wip-outline"
        size="small"
      >
        Vue liste {vue}
      </Button>
      <Button
        iconId="fr-icon-user-add-line"
        linkProps={{
          href: '/coop/mes-activites/tableau',
        }}
        className="wip-outline"
        priority="tertiary"
        size="small"
      >
        Vue tableau {vue}
      </Button>
    </div>
    <div className="fr-flex fr-flex-gap-4v fr-align-items-center fr-mb-8v">
      TODO FILTRES
    </div>
    {children}
  </CoopPageContainer>
)

export default MesActivitesListeLayout
