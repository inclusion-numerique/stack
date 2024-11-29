'use client'

import { usePathname } from 'next/navigation'
import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import styles from '../coop/CoopSideMenu.module.css'

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
          <span className="fr-icon-settings-5-line ri-xl fr-mr-1w fr-text--regular" />
          Outils
        </>
      ),
      linkProps: {
        href: '/administration/outils',
      },
      isActive: pathname?.startsWith('/administration/outils'),
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
