import type { CSSProperties } from 'react'
import classNames from 'classnames'
import { marked, type Tokens } from 'marked'
import type { ChatCompletionMessageToolCall } from 'openai/src/resources/chat/completions'
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
    `<a target="_blank" rel="noreferrer noopener nofollow" `,
  )
}

const ChatMessage = ({
  message: { content, role, toolCalls },
  contentRef,
  style,
  hideAssistantLogo,
  isStreaming,
}: {
  toolCalls?: { name: string }[]
  message: ChatCompletionMessageWithToolCalls
  contentRef?: React.RefObject<HTMLDivElement>
  style?: CSSProperties
  hideAssistantLogo?: boolean
  isStreaming?: boolean
}) => {
  if (role !== 'Assistant' && role !== 'User') {
    return null
  }

  const parsedContent = content
    ? role === 'Assistant'
      ? marked.parse(content, { renderer })
      : content.replaceAll('\n', '<br />')
    : null

  return (
    <div
      className={classNames(
        styles.message,
        styles[`message${role}`],
        parsedContent ? 'fr-mb-10v' : 'fr-mb-0',
      )}
      style={style}
    >
      {role === 'Assistant' && !hideAssistantLogo && (
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
      {!!parsedContent && (
        <div
          ref={contentRef}
          dangerouslySetInnerHTML={{ __html: parsedContent }}
        />
      )}
    </div>
  )
}

export default ChatMessage
