import { Route } from 'next'
import { LinkRestProps } from 'next/link'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'

export type BreadcrumbParent = {
  label: string
  linkProps: Omit<LinkRestProps & { href: Route }, 'children'>
}
export type BreadcrumbParents = BreadcrumbParent[]

const Breadcrumbs = ({
  currentPage,
  parents = [],
}: {
  currentPage: string
  parents?: BreadcrumbParents
}) => (
  <Breadcrumb
    currentPageLabel={currentPage}
    homeLinkProps={{
      href: '/',
    }}
    segments={parents}
  />
)

export default Breadcrumbs
