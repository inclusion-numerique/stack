'use client'

import { usePathname } from 'next/navigation'
import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'

const AdministrationSideMenu = () => {
  const pathname = usePathname()

  const items = [
    {
      text: (
        <>
          <span className="fr-icon-team-line ri-xl fr-mr-1w fr-text--regular" />
          Utilisateurs
        </>
      ),
      linkProps: {
        href: '/administration/utilisateurs',
      },
      isActive: pathname?.startsWith('/administration/utilisateurs'),
    },
    {
      text: (
        <>
          <span className="fr-icon-archive-line ri-xl fr-mr-1w fr-text--regular" />
          Conseillers V1
        </>
      ),
      linkProps: {
        href: '/administration/conseillers-v1',
      },
      isActive: pathname?.startsWith('/administration/conseillers-v1'),
    },
    {
      text: (
        <>
          <span className="fr-icon-home-4-line ri-xl fr-mr-1w fr-text--regular" />
          Structures
        </>
      ),
      linkProps: {
        href: '/administration/structures',
      },
      isActive: pathname?.startsWith('/administration/structures'),
    },
    {
      text: (
        <>
          <span className="ri-spy-line ri-xl fr-mr-1w fr-text--regular" />
          Usurpation
        </>
      ),
      linkProps: {
        href: '/administration/usurpation',
      },
      isActive: pathname?.startsWith('/administration/usurpation'),
    },
    {
      text: (
        <>
          <span className="fr-icon-links-line ri-xl fr-mr-1w fr-text--regular" />
          Intégrations
        </>
      ),
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
