import { Route } from 'next'

export { generateMetadata } from '@app/web/app/(public)/(authentication)/connexion/preview-proxy/page'

const PreviewProxyCallbackPage = ({
  searchParams = {},
}: {
  searchParams?: { error?: string; suivant?: Route; preview?: string }
}) => {
  console.log('PreviewProxyCallbackPage', searchParams)
  return <pre>TODO</pre>
}

export default PreviewProxyCallbackPage
