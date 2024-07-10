'use client'

import { usePathname } from 'next/navigation'
import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import { CreateCraModalDefinition } from '@app/web/app/coop/mon-activite/CreateCraModalDefinition'
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
        <Button
          type="button"
          className="fr-ml-4v"
          {...CreateCraModalDefinition.buttonProps}
          iconId="fr-icon-add-line"
        >
          Enregistrer une activité
        </Button>
      ),
      isActive: false,
      linkProps: undefined as unknown as { href: string },
    })
  }

  return (
    <SideMenu
      classes={{
        item: styles.item,
      }}
      items={items}
      burgerMenuButtonText="Menu"
      sticky
      fullHeight
    />
  )
}

export default CoopSideMenu
