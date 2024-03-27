'use client'

import { usePathname } from 'next/navigation'
import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import { metabaseDashboardUrl } from '@app/web/app/(with-navigation)/administration/metabase'

const AdministrationSideMenu = () => {
  const pathname = usePathname()

  const items = [
    {
      text: 'Gouvernances',
      linkProps: {
        href: '/administration/gouvernances',
      },
      isActive: pathname?.startsWith('/administration/gouvernances'),
    },
    {
      text: 'Demandes de subvention',
      linkProps: {
        href: '/administration/demandes-de-subvention',
      },
      isActive: pathname?.startsWith('/administration/demandes-de-subvention'),
    },
    {
      text: 'Bénéficiaires subventions',
      linkProps: {
        href: '/administration/beneficiaires-subventions',
      },
      isActive: pathname?.startsWith(
        '/administration/beneficiaires-subventions',
      ),
    },
    {
      text: 'Besoins subventions',
      linkProps: {
        href: '/administration/besoins-subventions',
      },
      isActive: pathname?.startsWith('/administration/besoins-subventions'),
    },
    {
      text: 'Metabase',
      linkProps: {
        href: metabaseDashboardUrl,
        target: '_blank',
      },
    },
  ] satisfies SideMenuProps.Item[]

  return (
    <SideMenu
      title={
        <h5 className="fr-mt-md-4v fr-pl-4v fr-text-title--blue-france">
          Administration
        </h5>
      }
      items={items}
      burgerMenuButtonText="Menu Administration"
      sticky
      fullHeight
    />
  )
}

export default AdministrationSideMenu
