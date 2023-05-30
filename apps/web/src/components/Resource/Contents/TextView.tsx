import sanitizeHtml from 'sanitize-html'
import { ResourceContent } from '@app/web/server/resources/getResource'

const TextView = ({
  content: { text },
}: {
  content: Pick<ResourceContent, 'text'>
}) =>
  text ? <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }} /> : null

export default TextView
