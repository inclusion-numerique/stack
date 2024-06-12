'use client'

import { usePathname } from 'next/navigation'
import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import { SessionUser } from '@app/web/auth/sessionUser'
import styles from './CoopSideMenu.module.css'

const CoopSideMenu = ({ user }: { user: SessionUser }) => {
  const pathname = usePathname()

  // TODO real check ?
  const canCreateCra = !!user.id

  const items = [
    {
      text: (
        <>
          <span className="fr-icon-home-4-line fr-mr-1w" />
          Accueil
        </>
      ),
      linkProps: {
        href: '/coop',
      },
      isActive: pathname === '/coop',
    },
    {
      text: (
        <>
          <span className="fr-icon-chat-poll-line fr-mr-1w wip-outline" />
          Mon activité
        </>
      ),
      linkProps: {
        href: '/coop/mon-activite',
      },
      isActive: pathname?.startsWith('/coop/mon-activite'),
    },
    {
      text: (
        <>
          <span className="fr-icon-heart-line fr-mr-1w wip-outline" />
          Mes bénéficiaires
        </>
      ),
      linkProps: {
        href: '/coop/mes-beneficiaires',
      },
      isActive: pathname?.startsWith('/coop/mes-beneficiaires'),
    },
    {
      text: (
        <>
          <span className="fr-icon-parent-line fr-mr-1w wip-outline" />
          Mes ateliers
        </>
      ),
      linkProps: {
        href: '/coop/mes-ateliers',
      },
      isActive: pathname?.startsWith('/coop/mes-ateliers'),
    },
    {
      text: (
        <>
          <span className="fr-icon-compass-3-line fr-mr-1w wip-outline" />
          Mes outils
        </>
      ),
      linkProps: {
        href: '/coop/mes-outils',
      },
      isActive: pathname?.startsWith('/coop/mes-outils'),
    },
  ] satisfies SideMenuProps.Item[]

  if (canCreateCra) {
    items.push({
      text: (
        <button
          type="button"
          className="fr-ml-4v wip-outline fr-btn fr-btn--icon-left fr-icon-add-line"
        >
          Enregistrer une activité
        </button>
      ),
      isActive: false,
      linkProps: {
        href: '/coop/mon-activite/enregistrer-une-activite',
      },
    })
  }

  return (
    <SideMenu
      title={
        <h5 className="fr-mt-md-4v fr-pl-4v fr-text-title--blue-france">
          Administration
        </h5>
      }
      classes={{
        item: styles.item,
      }}
      items={items}
      burgerMenuButtonText="Menu Administration"
      sticky
      fullHeight
    />
  )
}

export default CoopSideMenu
