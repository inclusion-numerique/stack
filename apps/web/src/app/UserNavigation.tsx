'use client'

import { MainNavigation } from '@codegouvfr/react-dsfr/MainNavigation'
import { usePathname } from 'next/navigation'
import { SessionUser } from '@app/web/auth/sessionUser'
import { hasAccessToNationalStatistics } from '@app/web/security/securityRules'

const UserNavigation = ({ user }: { user: SessionUser }) => {
  const pathname = usePathname()

  const linkProps = (path: string) => ({
    isActive: pathname?.startsWith(path) ?? false,
    linkProps: {
      href: path,
      prefetch: false,
    },
  })

  return (
    <div className="fr-nav__container">
      <div className="fr-container">
        <MainNavigation
          items={[
            {
              text: 'Données de l’Inclusion Numérique',
              ...linkProps('/tableau-de-bord'),
            },
            {
              text: 'Gouvernance',
              ...linkProps('/gouvernances'),
            },
            ...(hasAccessToNationalStatistics(user)
              ? [
                  // {
                  //   text: 'Statistiques',
                  //   ...linkProps('/statistiques'),
                  // },
                ]
              : []),
          ]}
        />
      </div>
    </div>
  )
}

export default UserNavigation
