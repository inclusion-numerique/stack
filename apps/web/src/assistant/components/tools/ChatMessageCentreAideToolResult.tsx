import ToolResultCard from '@app/web/assistant/components/tools/ToolResultCard'
import { CentreAideToolResult } from '@app/web/assistant/tools/centreAideRagTool'
import LogoCoop from '@app/web/components/LogoCoop'
import type { ToolInvocation } from 'ai'
import { type Tokens, marked } from 'marked'
import { parse } from 'yaml'

const parseYamlToolContent = (content: string) => {
  try {
    return parse(content) as CentreAideToolResult
  } catch {
    return null
  }
}

const renderer = new marked.Renderer()
const linkRenderer = renderer.link.bind(renderer)
renderer.link = (linkParameters: Tokens.Link) => {
  const html = linkRenderer(linkParameters)
  return html.replace(
    /^<a /,
    `<a target="_blank" class="fr-link" rel="noreferrer noopener nofollow" `,
  )
}

const _imageRenderer = renderer.image.bind(renderer)
renderer.image = (_imageParameters: Tokens.Image) => {
  // // Add domain name to src of image
  // const href = imageParameters.href
  //
  // // Add centreAideDomaine prepended to href
  // const src = href.startsWith('http')
  //   ? href
  //   : `${PublicWebAppConfig.centreAideDomaine}/${href}`
  //
  // imageParameters.href = src
  //
  // return imageRenderer(imageParameters)

  // TODO images are relative to article url, we cannot guess the base url

  return ''
}

const AideIcon = () => <LogoCoop height={40} width={40} />

const ChatMessageCentreAideToolResult = ({
  toolInvocation: { result },
}: {
  toolInvocation: ToolInvocation & { state: 'result' }
}) => {
  const parsedToolContent = parseYamlToolContent(result)

  if (!parsedToolContent || typeof parsedToolContent !== 'object') {
    return null
  }

  if ('error' in parsedToolContent || !parsedToolContent.sources) {
    return (
      <ToolResultCard title={parsedToolContent.error || 'Aucun résultat'} />
    )
  }

  const { sources } = parsedToolContent

  return (
    <>
      {sources.length > 0 && (
        <>
          {sources.map((source) => {
            const parsedContent = marked.parse(source.content, {
              renderer,
              async: false,
            })

            return (
              <ToolResultCard
                key={source.id}
                title={source.title || 'Centre d’aide - article'}
                url={source.url}
                icon={<AideIcon />}
              >
                <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
              </ToolResultCard>
            )
          })}
        </>
      )}
    </>
  )
}

export default ChatMessageCentreAideToolResult
