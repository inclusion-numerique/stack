'use client'

import Header from '@codegouvfr/react-dsfr/Header'
import * as navigation from 'next/navigation'
import { menu } from './menu'

const PublicHeader = () => {
  const pathname =
    // TODO This is an error in typings of next/navigation in 13.2, remove this casting when next fix this
    (navigation as unknown as { usePathname: () => string }).usePathname() ??
    '/'

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
