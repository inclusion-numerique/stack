import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import {
  defaultTheme,
  Preflight,
  ThemeProvider,
  x,
} from '@xstyled/styled-components'

export const metadata: Metadata = {
  title: metadataTitle('API'),
}

/**
 * We use spotlight elements to render the api docs
 */
const ApiDocsPage = async () => {
  const SpotlightElement = await import('@stoplight/elements')

  const theme = {
    ...defaultTheme,
  }

  return (
    <ThemeProvider theme={theme}>
      <x.div h="100vh" mx="auto">
        <Preflight />
        <SpotlightElement.API
          apiDescriptionUrl="/api/v1/doc.json"
          layout="sidebar"
          router="hash"
        />
      </x.div>
    </ThemeProvider>
  )
}

export default ApiDocsPage
