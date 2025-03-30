import ToolResultCard from '@app/web/assistant/components/tools/ToolResultCard'
import type { AgenticSearchToolYamlResult } from '@app/web/assistant/tools/agenticSearchTool'
import type { ToolInvocation } from 'ai'
import he from 'he'
import { type Tokens, marked } from 'marked'
import { parse } from 'yaml'

const parseYamlToolContent = (content: string) => {
  try {
    return parse(content) as AgenticSearchToolYamlResult
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

const LesBasesIcon = () => (
  <img
    className="fr-background-alt--blue-france fr-border-radius--8 fr-p-2v"
    width={32}
    height={32}
    src="/images/services/les-bases.svg"
    alt=""
  />
)

const PageWebIcon = ({ src }: { src?: string }) =>
  src ? (
    <img
      className=" fr-border-radius--8 fr-p-0"
      width={32}
      height={32}
      src={src}
      alt=""
    />
  ) : (
    <div
      className="fr-background-alt--blue-france fr-border-radius--8 fr-flex fr-align-items-center fr-justify-content-center"
      style={{ width: 32, height: 32 }}
    >
      <span
        className="fr-icon-global-line fr-icon--md fr-text-title--blue-france"
        aria-hidden
      />
    </div>
  )

const _PageWebOfficielleIcon = ({ src }: { src?: string }) =>
  src ? (
    <img
      className=" fr-border-radius--8 fr-p-0"
      width={32}
      height={32}
      src={src}
      alt=""
    />
  ) : null

const getFirstLine = (content: string) => {
  const newlineIndex = content.indexOf('\n')
  return newlineIndex === -1 ? content : content.slice(0, newlineIndex)
}

const getTitleFromMarkdown = (markdown: string) => {
  const firstLine = getFirstLine(markdown)

  // if this is not a title (starts with #), returns null
  if (!firstLine.startsWith('#')) {
    return null
  }

  return firstLine.replace(/^#+\s+/, '')
}

const removeFirstLine = (content: string) => {
  const newlineIndex = content.indexOf('\n')
  return newlineIndex === -1 ? content : content.slice(newlineIndex + 1)
}

const ChatMessageAgenticSearchToolResult = ({
  toolInvocation: { result },
}: {
  toolInvocation: ToolInvocation & { state: 'result' }
}) => {
  const parsedToolContent = parseYamlToolContent(result)

  if (!parsedToolContent || typeof parsedToolContent !== 'object') {
    return null
  }

  if ('error' in parsedToolContent) {
    return <ToolResultCard>{parsedToolContent.error}</ToolResultCard>
  }

  const sourcesLesBases = parsedToolContent.sources_les_bases ?? []
  const sourcesSitesWeb = parsedToolContent.sources_sites_web ?? []
  const sourcesSitesOfficiels = parsedToolContent.sources_sites_officiels ?? []

  // TODO separate UI ?
  const webSources = [...sourcesSitesWeb, ...sourcesSitesOfficiels]

  return (
    <>
      {sourcesLesBases.length > 0 && (
        <>
          {/*<h3 className={styles.toolResultTitle}>*/}
          {/*  Ressources sur les bases du numérique d’intérêt général*/}
          {/*</h3>*/}

          {sourcesLesBases.map((source) => {
            const title = getTitleFromMarkdown(source.content)

            const contentToParse = title
              ? removeFirstLine(source.content)
              : source.content

            const parsedContent = marked.parse(contentToParse, {
              renderer,
              async: false,
            })

            return (
              <ToolResultCard
                key={source.id}
                title={title || 'Les bases - ressource'}
                url={source.url}
                icon={<LesBasesIcon />}
              >
                <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
              </ToolResultCard>
            )
          })}
        </>
      )}
      {webSources.length > 0 && (
        <>
          {/*<h3 className={styles.toolResultTitle}>*/}
          {/*  Sites web */}
          {/*</h3>*/}

          {webSources.map((source) => {
            // Extract the domain from the url to use as title
            const title = source.url.split('/')[2]

            return (
              <ToolResultCard
                key={source.url}
                title={title}
                url={source.url}
                icon={<PageWebIcon src={source.thumbnail?.src} />}
              >
                <p className="fr-text--bold fr-mb-1v">{source.title}</p>
                <div className="fr-mb-4v">
                  <a href={source.url} target="_blank">
                    {source.url}
                  </a>
                </div>
                {source.summary ? (
                  <>
                    <p className="fr-text--bold fr-mb-4v">
                      Résumé de la page&nbsp;:
                    </p>
                    <div
                      className="fr-mb-0"
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(source.summary, {
                          renderer,
                          async: false,
                        }),
                      }}
                    />
                  </>
                ) : (
                  <p className="fr-mb-0">{he.decode(source.description)}</p>
                )}
              </ToolResultCard>
            )
          })}
        </>
      )}
    </>
  )
}

export default ChatMessageAgenticSearchToolResult
