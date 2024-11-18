// app.css must be the first import for webpack css chunks to work properly
// eslint-disable-next-line import/order
// setup.ts must be the first import for webpack css chunks to work properly
// eslint-disable-next-line import/order
import '@app/web/app/setup'
import { Metadata, Viewport } from 'next'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { setLink } from '@codegouvfr/react-dsfr/link'
import Toaster from '@app/ui/toast/Toaster'
import { Dsfr } from '@app/web/app/Dsfr'
import { EnvInformation } from '@app/web/app/EnvInformation'
import { Matomo } from '@app/web/app/Matomo'
import { PreloadResources } from '@app/web/app/PreloadResources'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { getServerDsfrTheme } from '@app/web/app/getServerDsfrTheme'

declare module '@codegouvfr/react-dsfr/link' {
  interface RegisterLink {
    Link: typeof Link
  }
}

setLink({
  Link,
})

export const metadata: Metadata = {
  title: PublicWebAppConfig.projectTitle,
  robots: PublicWebAppConfig.isMain ? 'index, follow' : 'noindex, nofollow',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
    other: {
      rel: 'icon',
      url: '/favicon/favicon.svg',
      type: 'image/svg+xml',
    },
  },
  description: PublicWebAppConfig.projectTitle,
  manifest: '/favicon/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#000091',
}

const RootLayout = ({ children }: PropsWithChildren) => {
  // Do we want to disable SSG for CSFR on this website ?
  // const nonce = headers().get('x-sde-script-nonce') ?? undefined
  const nonce = undefined
  const theme = getServerDsfrTheme()
  return (
    <html lang="fr" data-fr-theme={theme} data-fr-scheme={theme}>
      <head>
        <link
          rel="preload"
          href="/images/spinner.svg"
          as="image"
          type="image/svg+xml"
        />
      </head>
      <body>
        <PreloadResources />
        <Dsfr nonce={nonce} />
        <Matomo nonce={nonce} />
        <EnvInformation />
        {children}
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout
