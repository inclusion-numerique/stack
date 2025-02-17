import { CSSProperties } from 'react'
import classNames from 'classnames'
import { marked, type Tokens } from 'marked'
import type { ChatCompletionMessageToolCall } from 'openai/src/resources/chat/completions'
import type { AssistantChatRole } from '@prisma/client'
import { parse } from 'yaml'
import LogoCoop from '@app/web/components/LogoCoop'
import ToolCallMessage from '@app/web/assistant/ToolCallMessage'
import type { ChatCompletionMessageWithToolCalls } from '@app/web/assistant/getChatSession'
import type { AgenticSearchToolYamlResult } from '@app/web/assistant/tools/agenticSearchTool'
import styles from './ChatSession.module.css'

const renderer = new marked.Renderer()
const linkRenderer = renderer.link.bind(renderer)
renderer.link = (linkParameters: Tokens.Link) => {
  const html = linkRenderer(linkParameters)
  return html.replace(
    /^<a /,
    `<a target="_blank" class="fr-link" rel="noreferrer noopener nofollow" `,
  )
}

const parseYamlToolContent = (content: string) => {
  try {
    return parse(content) as AgenticSearchToolYamlResult
  } catch (error) {
    console.error('Error parsing yaml', error)
    return null
  }
}

const ChatMessage = ({
  message: { content, role, toolCalls },
  contentRef,
  style,
  previousMessageRole,
  isStreaming,
  cursor,
}: {
  toolCalls?: { name: string }[]
  message: ChatCompletionMessageWithToolCalls
  contentRef?: React.RefObject<HTMLDivElement>
  style?: CSSProperties
  previousMessageRole?: AssistantChatRole
  isStreaming?: boolean
  cursor?: boolean // display blinking cursor at the end of the message
}) => {
  const marginTop = role === previousMessageRole ? 'fr-mt-0' : 'fr-mt-10v'

  if (role === 'Tool') {
    console.log('TOOL MESSAGE', { content, role, toolCalls })
    if (!content) {
      return null
    }
    const parsedToolContent = parseYamlToolContent(content)

    if (!parsedToolContent) {
      return null
    }

    if ('error' in parsedToolContent) {
      return (
        <div
          className={classNames(
            styles.message,
            styles[`message${role}`],
            marginTop,
          )}
          style={style}
        >
          Je n’ai pas pu trouver de résultats pertinents
        </div>
      )
    }

    const webResults = [
      ...(parsedToolContent.sources_sites_officiels ?? []),
      ...(parsedToolContent.sources_sites_web ?? []),
    ]

    const ragResults = [
      ...(parsedToolContent.sources_centre_aide ?? []),
      ...(parsedToolContent.sources_les_bases ?? []),
    ]

    return (
      <div
        className={classNames(
          styles.message,
          styles[`message${role}`],
          marginTop,
        )}
        style={style}
      >
        <div
          className={classNames(
            'fr-flex fr-flex-nowrap',
            styles.sourceCardsContainer,
          )}
        >
          {webResults.length > 0
            ? webResults.map((result) => (
                <div key={result.url} className={styles.sourceCard}>
                  <a href={result.url} target="_blank">
                    {result.title || result.url}
                  </a>
                  <p className="fr-text--xs fr-text-mention--grey">
                    {result.description}
                  </p>
                </div>
              ))
            : null}
          {ragResults.length > 0
            ? ragResults.map((result) => (
                <div key={result.url} className={styles.sourceCard}>
                  {!!result.url && (
                    <a href={result.url} target="_blank">
                      {result.url}
                    </a>
                  )}
                  {!!result.content && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(result.content, { async: false }),
                      }}
                    />
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
    )
  }

  if (role !== 'Assistant' && role !== 'User') {
    return null
  }

  const contentToParse =
    cursor || 1
      ? `${content ?? ''}<span class="chat-message__blinking-cursor" />`
      : content

  const parsedContent = contentToParse
    ? role === 'Assistant'
      ? marked
          .parse(contentToParse, { renderer, async: false })
          // Replace all composed characters with non breakable spaces
          .replaceAll(/ ([!%:;?»])/g, '&nbsp;$1')
      : contentToParse
          .replaceAll('\n', '<br />')
          // Replace all composed characters with non breakable spaces
          .replaceAll(/ ([!%:;?»])/g, '&nbsp;$1')
    : ''

  return (
    <div
      className={classNames(
        styles.message,
        styles[`message${role}`],
        marginTop,
      )}
      style={style}
    >
      {role === 'Assistant' && previousMessageRole !== 'Assistant' && (
        <LogoCoop className={styles.messageLogoCoop} height={32} width={32} />
      )}
      {!!toolCalls && toolCalls.length > 0 && (
        <div className={styles.messageToolCalls}>
          {(toolCalls as unknown as ChatCompletionMessageToolCall[]).map(
            (toolCall) => (
              <ToolCallMessage
                key={toolCall.id}
                // TODO errors for tools calls ?
                status={isStreaming ? 'loading' : 'success'}
                toolCall={toolCall}
              />
            ),
          )}
        </div>
      )}
      <div
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: parsedContent }}
      />
    </div>
  )
}

export default ChatMessage
