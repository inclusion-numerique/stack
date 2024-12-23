import type { AssistantChatMessage } from '@prisma/client'
import type { CSSProperties } from 'react'
import styles from './ChatSession.module.css'
import LogoCoop from '@app/web/components/LogoCoop'
import classNames from 'classnames'
import { marked } from 'marked'

const ChatMessage = ({
  message: { content, role, toolCalls },
  contentRef,
  style,
}: {
  toolCalls?: { name: string }[]
  message: Pick<AssistantChatMessage, 'content' | 'role' | 'toolCalls'>
  contentRef?: React.RefObject<HTMLDivElement>
  style?: CSSProperties
}) => {
  const parsedContent =
    role === 'Assistant'
      ? marked.parse(content)
      : content.replaceAll('\n', '<br />')

  return (
    <div
      className={classNames(styles.message, styles[`message${role}`])}
      style={style}
    >
      {role === 'Assistant' && (
        <LogoCoop className={styles.messageLogoCoop} height={32} width={32} />
      )}
      {!!toolCalls && toolCalls.length > 0 && (
        <div className={styles.messageToolCalls}>
          {toolCalls.map((toolCall, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className={styles.messageToolCall} key={index}>
              {JSON.stringify(toolCall, null, 2)}
            </div>
          ))}
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
