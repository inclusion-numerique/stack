'use client'

import Header from '@codegouvfr/react-dsfr/Header'
import { usePathname } from 'next/navigation'
import { SessionUser } from '@app/web/auth/sessionUser'
import { menu } from './menu'

const PublicHeader = ({ user }: { user?: SessionUser | null }) => {
  const pathname = usePathname() ?? '/'

  return (
    <Header
      brandTop={
        <>
          République
          <br />
          Française
        </>
      }
      homeLinkProps={{
        href: '/',
        title: 'Accueil ',
      }}
      operatorLogo={{
        imgUrl: '/images/logo-anct.svg',
        alt: "Logo de l'Agence Nationale de la Cohésion des Territoires",
        orientation: 'horizontal',
      }}
      quickAccessItems={[
        user
          ? {
              text: user.name,
              iconId: 'fr-icon-logout-box-r-line',
              linkProps: { href: '/deconnexion' },
            }
          : {
              text: 'Se connecter',
              iconId: 'fr-icon-user-line',
              linkProps: { href: '/connexion' },
            },
      ]}
      navigation={menu.map((item) => ({
        text: item.text,
        linkProps: {
          href: item.href,
        },
        isActive: pathname === item.href,
      }))}
      serviceTitle={process.env.NEXT_PUBLIC_APP_NAME}
    />
  )
}

export default PublicHeader
