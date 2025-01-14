import type { CSSProperties } from 'react'
import classNames from 'classnames'
import { marked, type Tokens } from 'marked'
import type { ChatCompletionMessageToolCall } from 'openai/src/resources/chat/completions'
import type { AssistantChatRole } from '@prisma/client'
import LogoCoop from '@app/web/components/LogoCoop'
import ToolCallMessage from '@app/web/assistant/ToolCallMessage'
import type { ChatCompletionMessageWithToolCalls } from '@app/web/assistant/getChatSession'
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
  if (role !== 'Assistant' && role !== 'User') {
    return null
  }

  const contentToParse =
    cursor || 1
      ? `${content ?? ''}<span class="chat-message__blinking-cursor"/>`
      : content

  const parsedContent = contentToParse
    ? role === 'Assistant'
      ? marked.parse(contentToParse, { renderer, async: false })
      : contentToParse.replaceAll('\n', '<br />')
    : ''

  const marginTop = role === previousMessageRole ? 'fr-mt-0' : 'fr-mt-10v'

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
