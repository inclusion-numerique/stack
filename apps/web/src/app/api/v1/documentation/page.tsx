import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import '@stoplight/elements/styles.min.css'
import ApiDocsPageContent from '@app/web/app/api/v1/documentation/ApiDocsPageContent'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('API'),
}

const ApiDocsPage = () => <ApiDocsPageContent />

export default ApiDocsPage
