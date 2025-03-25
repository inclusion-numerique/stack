import ToolCallMessage from '@app/web/assistant/ToolCallMessage'
import type { ChatCompletionMessageWithToolCalls } from '@app/web/assistant/getChatSession'
import type { AgenticSearchToolYamlResult } from '@app/web/assistant/tools/agenticSearchTool'
import LogoCoop from '@app/web/components/LogoCoop'
import type { AssistantChatRole } from '@prisma/client'
import classNames from 'classnames'
import { type Tokens, marked } from 'marked'
import type { CSSProperties, RefObject } from 'react'
import { parse } from 'yaml'
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
  } catch {
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
  message: ChatCompletionMessageWithToolCalls
  contentRef?: RefObject<HTMLDivElement>
  style?: CSSProperties
  previousMessageRole?: AssistantChatRole
  isStreaming?: boolean
  cursor?: boolean // display blinking cursor at the end of the message
}) => {
  // Do not render non "interactive" messages
  if (role !== 'Assistant' && role !== 'Tool' && role !== 'User') {
    return null
  }

  const toolCall = toolCalls?.[0]

  const previousMessageIsSameRole =
    (previousMessageRole === 'User' && role === 'User') ||
    ((previousMessageRole === 'Assistant' || previousMessageRole === 'Tool') &&
      (role === 'Assistant' || role === 'Tool'))

  const marginTop = previousMessageIsSameRole ? 'fr-mt-0' : 'fr-mt-10v'

  if (role === 'Tool') {
    if (!content) {
      return null
    }

    const parsedToolContent = parseYamlToolContent(content)

    if (!parsedToolContent || typeof parsedToolContent !== 'object') {
      return null
    }

    if ('error' in parsedToolContent) {
      return null
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
                  <p className="fr-text--xs fr-text-mention--grey fr-mt-4v">
                    {result.summary || result.description}
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
                      className="fr-mt-4v"
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

  const parsedContent = content
    ? role === 'Assistant'
      ? marked.parse(content, { renderer, async: false })
      : content
    : ''

  const cleanedContent = parsedContent
    .replaceAll('\n', '<br />')
    // Replace all composed characters with non breakable spaces
    .replaceAll(/ ([!%:;?»])/g, '&nbsp;$1')

  const contentWithCursor = cursor
    ? `${cleanedContent ?? ''}<span class="chat-message__blinking-cursor" />`
    : cleanedContent

  return (
    <div
      className={classNames(
        styles.message,
        styles[`message${role}`],
        marginTop,
      )}
      style={style}
    >
      {role !== 'User' && !previousMessageIsSameRole && (
        <LogoCoop className={styles.messageLogoCoop} height={32} width={32} />
      )}
      {!!toolCall && (
        <div className={styles.messageToolCalls}>
          <ToolCallMessage
            key={toolCall.id}
            // TODO errors for tools calls ?
            status={isStreaming ? 'loading' : 'success'}
            toolCall={toolCall}
          />
        </div>
      )}
      <div
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: contentWithCursor }}
      />
    </div>
  )
}

export default ChatMessage
