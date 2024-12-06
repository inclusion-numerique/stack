import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { metadataTitle } from '@app/web/app/metadataTitle'
import '@stoplight/elements/styles.min.css'
import ApiDocsPageContent from '@app/web/app/api/v1/documentation/ApiDocsPageContent'

export const metadata: Metadata = {
  title: metadataTitle('API'),
}

/**
 * We use stoplight elements to render the api docs
 */
const ApiDocsPage = () => <ApiDocsPageContent />

// Stoplight is not compatible with ssr (router="hash" etc.)
export default dynamic(() => Promise.resolve(ApiDocsPage), {
  ssr: false,
})
