import { Route } from 'next'
import { LinkProps } from 'next/link'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'

export type BreadcrumbParent = {
  label: string
  linkProps: Omit<LinkProps & { href: Route }, 'children'>
}
export type BreadcrumbParents = BreadcrumbParent[]

export type BreadcrumbsProps = {
  currentPage: string
  parents?: BreadcrumbParents
}

const Breadcrumbs = ({ currentPage, parents = [] }: BreadcrumbsProps) => (
  <Breadcrumb
    currentPageLabel={currentPage}
    homeLinkProps={{
      href: '/',
    }}
    segments={parents}
  />
)

export default Breadcrumbs
