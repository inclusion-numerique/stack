'use client'

import type { MainNavigationProps } from '@codegouvfr/react-dsfr/MainNavigation'
import { MainNavigation as DsfrMainNavigation } from '@codegouvfr/react-dsfr/MainNavigation'
import { usePathname } from 'next/navigation'
import { SessionUser } from '@app/web/auth/sessionUser'
import { hasAccessToAdministration } from '@app/web/security/securityRules'

const MainNavigation = ({ user }: { user: SessionUser | null }) => {
  const pathname = usePathname()

  const items: MainNavigationProps.Item[] = [
    {
      text: 'Données de l’inclusion numérique',
      linkProps: {
        href: '/donnees',
      },
      isActive: pathname?.startsWith('/donnees'),
    },
    {
      text: 'Gouvernances',
      linkProps: {
        href: '/gouvernances',
      },
      isActive: pathname?.startsWith('/gouvernances'),
    },
    {
      text: 'En savoir plus sur les données',
      linkProps: {
        href: '/en-savoir-plus-sur-les-donnees',
      },
      isActive: pathname === '/en-savoir-plus-sur-les-donnees',
    },
  ]

  if (hasAccessToAdministration(user)) {
    items.push({
      text: 'Administration',
      linkProps: {
        href: '/administration',
      },
      isActive: pathname?.startsWith('/administration'),
    })
  }

  return (
    <div className="fr-nav__container">
      <div className="fr-container">
        <DsfrMainNavigation items={items} />
      </div>
    </div>
  )
}

export default MainNavigation
