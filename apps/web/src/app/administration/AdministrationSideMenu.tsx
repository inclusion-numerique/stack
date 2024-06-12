'use client'

import { usePathname } from 'next/navigation'
import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'

const AdministrationSideMenu = () => {
  const pathname = usePathname()

  const items = [
    {
      text: 'Structures',
      linkProps: {
        href: '/administration/structures',
      },
      isActive: pathname?.startsWith('/administration/structures'),
    },
    {
      text: 'Usurpation',
      linkProps: {
        href: '/administration/usurpation',
      },
      isActive: pathname?.startsWith('/administration/usurpation'),
    },
    {
      text: 'Intégrations',
      isActive: pathname?.startsWith('/administration/integrations'),
      expandedByDefault: pathname?.startsWith('/administration/integrations'),
      items: [
        {
          text: 'Conseillers numérique',
          isActive: pathname?.startsWith(
            '/administration/integrations/conseillers-numerique',
          ),
          linkProps: {
            href: '/administration/integrations/conseillers-numerique',
          },
        },
      ],
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
