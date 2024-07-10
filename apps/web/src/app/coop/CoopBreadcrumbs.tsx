import Breadcrumbs, {
  type BreadcrumbParents,
} from '@app/web/components/Breadcrumbs'

const CoopBreadcrumbs = ({
  currentPage,
  parents = [],
  className,
}: {
  currentPage: string
  parents?: BreadcrumbParents
  className?: string
}) => (
  <Breadcrumbs
    currentPage={currentPage}
    parents={parents}
    homeLinkHref="/coop"
    className={className ?? 'fr-mb-4v'}
  />
)

export default CoopBreadcrumbs
