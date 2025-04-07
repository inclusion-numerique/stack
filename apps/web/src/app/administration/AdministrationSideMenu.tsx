'use client'

import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import { usePathname } from 'next/navigation'
import styles from './AdministrationSideMenu.module.css'

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
          <span className="ri-key-2-line ri-xl fr-mr-1w fr-text--regular" />
          Clients API
        </>
      ),
      linkProps: {
        href: '/administration/clients-api',
      },
      isActive: pathname?.startsWith('/administration/clients-api'),
    },
    {
      text: (
        <>
          <span className="fr-icon-line-chart-line ri-xl fr-mr-1w fr-text--regular" />
          Statistiques
        </>
      ),
      linkProps: {
        href: '/administration/statistiques',
      },
      isActive: pathname?.startsWith('/administration/statistiques'),
    },
  ] satisfies SideMenuProps.Item[]

  return (
    <SideMenu
      title={
        <p className="fr-text-title--blue-france fr-h5 fr-mb-0">
          Administration
        </p>
      }
      classes={{ item: styles.item, root: styles.sideMenu }}
      items={items}
      burgerMenuButtonText="Menu Administration"
      sticky
      fullHeight
    />
  )
}

export default AdministrationSideMenu
