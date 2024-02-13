'use client'

import { MainNavigation } from '@codegouvfr/react-dsfr/MainNavigation'
import { usePathname } from 'next/navigation'
import type { MainNavigationProps } from '@codegouvfr/react-dsfr/MainNavigation'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  hasAccessToAdministration,
  hasAccessToDonneesDeLInclusionNumerique,
  hasAccessToRemonteesGouvernances,
} from '@app/web/security/securityRules'

const UserNavigation = ({ user }: { user: SessionUser }) => {
  const pathname = usePathname()

  const linkProps = (path: string) => ({
    isActive: pathname?.startsWith(path) ?? false,
    linkProps: {
      href: path,
    },
  })

  const items: MainNavigationProps.Item[] = []

  if (hasAccessToDonneesDeLInclusionNumerique(user)) {
    items.push({
      text: 'Données de l’Inclusion Numérique',
      ...linkProps('/donnees'),
    })
  }

  if (hasAccessToRemonteesGouvernances(user)) {
    items.push({
      text: 'Gouvernance',
      ...linkProps('/gouvernances'),
    })
  }

  if (hasAccessToAdministration(user)) {
    items.push({
      text: 'Administration',
      ...linkProps('/administration'),
    })
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="fr-nav__container">
      <div className="fr-container">
        <MainNavigation items={items} />
      </div>
    </div>
  )
}

export default UserNavigation
