'use client'

import type { MainNavigationProps } from '@codegouvfr/react-dsfr/MainNavigation'
import { MainNavigation as DsfrMainNavigation } from '@codegouvfr/react-dsfr/MainNavigation'
import { usePathname } from 'next/navigation'
import { SessionUser } from '@app/web/auth/sessionUser'
import { hasAccessToAdministration } from '@app/web/security/securityRules'
import { getDonneesRouteForUser } from '@app/web/app/(public)/donnees/getDonneesRouteForUser'
import { getGouvernancesRouteForUser } from '@app/web/app/(public)/gouvernance/getGouvernancesRouteForUser'
import { getLastVisitedGouvernanceScope } from '@app/web/app/getLastVisitedGouvernanceScope.client'

const MainNavigation = ({ user }: { user: SessionUser | null }) => {
  const pathname = usePathname()
  const lastVisitedScope = getLastVisitedGouvernanceScope()

  console.log('LAST VISITED SCOPE', lastVisitedScope)

  const items: MainNavigationProps.Item[] = [
    {
      text: 'Données de l’inclusion numérique',
      linkProps: {
        href: getDonneesRouteForUser(user, lastVisitedScope),
      },
      isActive: pathname?.startsWith('/donnees'),
    },
    {
      text: 'Gouvernance',
      linkProps: {
        href: getGouvernancesRouteForUser(user, lastVisitedScope),
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

  console.log(
    'ITEMS',
    items.map(({ text, linkProps, isActive }) => ({
      text,
      href: linkProps.href,
      isActive,
    })),
  )

  return (
    <div className="fr-nav__container">
      <div className="fr-container">
        <DsfrMainNavigation items={items} />
      </div>
    </div>
  )
}

export default MainNavigation
