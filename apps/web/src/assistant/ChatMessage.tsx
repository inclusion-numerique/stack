import type { AssistantChatMessage } from '@prisma/client'
import type { CSSProperties } from 'react'
import styles from './ChatSession.module.css'
import LogoCoop from '@app/web/components/LogoCoop'
import classNames from 'classnames'
import { marked } from 'marked'

const ChatMessage = ({
  message: { content, role },
  contentRef,
  style,
}: {
  message: Pick<AssistantChatMessage, 'content' | 'role'>
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
      <div
        ref={contentRef}
        dangerouslySetInnerHTML={{ __html: parsedContent }}
      />
    </div>
  )
}

export default ChatMessage
