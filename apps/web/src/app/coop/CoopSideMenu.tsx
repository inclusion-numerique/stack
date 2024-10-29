'use client'

import { usePathname } from 'next/navigation'
import type { SideMenuProps } from '@codegouvfr/react-dsfr/SideMenu'
import SideMenu from '@codegouvfr/react-dsfr/SideMenu'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { SessionUser } from '@app/web/auth/sessionUser'
import { CreateCraModalDefinition } from '@app/web/app/coop/(full-width-layout)/mes-activites/CreateCraModalDefinition'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import styles from './CoopSideMenu.module.css'

const onlyFor =
  (user: SessionUser) =>
  ({ mediateurOnly }: { mediateurOnly?: true }) =>
    (mediateurOnly && user.mediateur?.id != null) || !mediateurOnly

const CoopSideMenu = ({ user }: { user: SessionUser }) => {
  const pathname = usePathname()

  const items: (SideMenuProps.Item & { mediateurOnly?: true })[] = [
    {
      text: (
        <>
          <span className="ri-home-line ri-xl fr-mr-1w fr-text--regular" />
          Accueil
        </>
      ),
      linkProps: { href: '/coop' },
      isActive: pathname === '/coop',
    },
    {
      text: (
        <>
          <span className="ri-chat-poll-line ri-xl fr-mr-1w fr-text--regular" />
          Statistiques
        </>
      ),
      linkProps: { href: '/coop/mes-statistiques' },
      isActive: pathname?.startsWith('/coop/mes-statistiques'),
    },
    {
      text: (
        <>
          <span className="ri-service-line ri-xl fr-mr-1w fr-text--regular" />
          Mes activités
        </>
      ),
      linkProps: { href: '/coop/mes-activites' },
      isActive: pathname?.startsWith('/coop/mes-activites'),
      mediateurOnly: true,
    },
    {
      text: (
        <>
          <span className="ri-user-heart-line ri-xl fr-mr-1w fr-text--regular" />
          Mes bénéficiaires
        </>
      ),
      linkProps: { href: '/coop/mes-beneficiaires' },
      isActive: pathname?.startsWith('/coop/mes-beneficiaires'),
      mediateurOnly: true,
    },
    {
      text: (
        <>
          <span className="ri-apps-2-line ri-xl fr-mr-1w fr-text--regular" />
          Mes outils
        </>
      ),
      linkProps: { href: '/coop/mes-outils' },
      isActive: pathname?.startsWith('/coop/mes-outils'),
    },
    {
      text: (
        <Button
          type="button"
          {...CreateCraModalDefinition.buttonProps}
          iconId="fr-icon-add-line"
          className="fr-width-full fr-my-7v"
        >
          Enregistrer une activité
        </Button>
      ),
      linkProps: undefined as unknown as { href: string },
      isActive: false,
      mediateurOnly: true,
    },
    {
      text: (
        <Button
          type="button"
          {...CreateCraModalDefinition.buttonProps}
          iconId="fr-icon-question-answer-line"
          priority="tertiary"
          className="fr-width-full"
        >
          Contacter le support
        </Button>
      ),
      isActive: false,
      linkProps: {
        href: `mailto:${PublicWebAppConfig.contactEmail}`,
      },
    },
  ]

  return (
    <SideMenu
      classes={{
        item: classNames(styles.item, styles.lastItemAtTheBottom),
        root: styles.sideMenu,
      }}
      items={items.filter(onlyFor(user))}
      burgerMenuButtonText="Menu"
      sticky
      fullHeight
    />
  )
}

export default CoopSideMenu
