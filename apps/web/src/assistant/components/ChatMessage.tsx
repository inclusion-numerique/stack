import ChatMessageTextPart from '@app/web/assistant/components/ChatMessageTextPart'
import ChatMessageToolInvocationPart from '@app/web/assistant/components/ChatMessageToolInvocationPart'
import LogoCoop from '@app/web/components/LogoCoop'
import { toTitleCase } from '@app/web/utils/toTitleCase'
import { UIMessage } from 'ai'
import classNames from 'classnames'
import type { CSSProperties } from 'react'
import styles from './ChatThread.module.css'

const ChatMessage = ({
  message: { id, parts, role },
  style,
  previousMessageRole,
  isStreaming,
  debug,
}: {
  message: UIMessage
  style?: CSSProperties
  previousMessageRole?: UIMessage['role']
  isStreaming?: boolean
  debug?: boolean
}) => {
  // Do not render non "interactive" messages
  if (role !== 'assistant' && role !== 'data' && role !== 'user') {
    return null
  }

  // TODO what with the roles for tool ??
  const previousMessageIsSameRole = previousMessageRole === role

  const marginTop = previousMessageIsSameRole ? 'fr-mt-0' : 'fr-mt-10v'

  return (
    <div
      className={classNames(
        styles.message,
        styles[`message${toTitleCase(role)}`],
        marginTop,
      )}
      style={style}
    >
      {role !== 'user' && !previousMessageIsSameRole && (
        <LogoCoop className={styles.messageLogoCoop} height={32} width={32} />
      )}
      {debug && (
        <pre className="fr-background-alt--beige-gris-galet fr-border-radius--8 fr-p-4v fr-mb-0 fr-text--xs">
          {JSON.stringify({ id, role, parts }, null, 2)}
        </pre>
      )}
      {parts.map((part, index) =>
        part.type === 'text' ? (
          <ChatMessageTextPart
            key={index}
            part={part}
            markdown={role !== 'user'}
            cursor={
              // display blinking cursor at the end of the message for last assistant streaming text part
              role === 'assistant' && isStreaming && index === parts.length - 1
            }
            previousMessageIsSameRole={previousMessageIsSameRole}
            style={style}
          />
        ) : part.type === 'tool-invocation' ? (
          <ChatMessageToolInvocationPart key={index} part={part} />
        ) : (
          <>Ce message ne peut pas être affiché</>
        ),
      )}
    </div>
  )
}

export default ChatMessage
