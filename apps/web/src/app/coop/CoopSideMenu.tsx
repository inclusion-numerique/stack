'use client'

import { usePathname } from 'next/navigation'
import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import { CreateCraModalDefinition } from '@app/web/app/coop/mes-activites/CreateCraModalDefinition'
import styles from './CoopSideMenu.module.css'

const CoopSideMenu = ({ user }: { user: SessionUser }) => {
  const pathname = usePathname()

  // TODO real check ?
  const canCreateCra = !!user.id

  const items = [
    {
      text: (
        <>
          <span className="ri-home-line ri-xl fr-mr-1w fr-text--regular" />
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
          <span className="ri-chat-poll-line ri-xl fr-mr-1w fr-text--regular" />
          Mes statistiques
        </>
      ),
      linkProps: {
        href: '/coop/mes-statistiques',
      },
      isActive: pathname?.startsWith('/coop/mes-statistiques'),
    },
    {
      text: (
        <>
          <span className="ri-service-line ri-xl fr-mr-1w fr-text--regular" />
          Mes activités
        </>
      ),
      linkProps: {
        href: '/coop/mes-activites',
      },
      isActive: pathname?.startsWith('/coop/mes-activites'),
    },
    {
      text: (
        <>
          <span className="ri-user-heart-line ri-xl fr-mr-1w fr-text--regular" />
          Mes bénéficiaires
        </>
      ),
      linkProps: {
        href: '/coop/mes-beneficiaires',
      },
      isActive: pathname?.startsWith('/coop/mes-beneficiaires'),
    },
    // {
    //   text: (
    //     <>
    //       <span className="ri-parent-line ri-xl fr-mr-1w fr-text--regular wip-outline" />
    //       Mes ateliers
    //     </>
    //   ),
    //   linkProps: {
    //     href: '/coop/mes-ateliers',
    //   },
    //   isActive: pathname?.startsWith('/coop/mes-ateliers'),
    // },
    {
      text: (
        <>
          <span className="ri-apps-2-line ri-xl fr-mr-1w fr-text--regular" />
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
      classes={{ item: styles.item }}
      items={items}
      burgerMenuButtonText="Menu"
      sticky
      fullHeight
    />
  )
}

export default CoopSideMenu
