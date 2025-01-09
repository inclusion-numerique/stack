import type { ChatCompletionMessageToolCall } from 'openai/src/resources/chat/completions'
import classNames from 'classnames'
import styles from '@app/web/assistant/ChatSession.module.css'
import { Spinner } from '@app/web/ui/Spinner'

const ToolCallMessage = ({
  toolCall,
  status,
}: {
  toolCall: ChatCompletionMessageToolCall
  status: 'loading' | 'success' | 'error'
}) => (
  <div
    className={classNames(
      'fr-flex-shrink-1 fr-text--sm',
      styles.messageToolCall,
    )}
    key={toolCall.id}
  >
    {status === 'loading' && <Spinner size="small" />}
    {status === 'success' && (
      <span className="fr-icon-check-line fr-icon--sm fr-text-default--success fr-mr-1w" />
    )}
    {status === 'error' && (
      <span className="fr-icon-error-line fr-icon--sm fr-text-default--success fr-mr-1w" />
    )}

    {toolCall.function.name === 'web_search' && (
      <>Je recherche sur internet pour avoir plus d’informations</>
    )}
    {toolCall.function.name === 'rag' && (
      <>Je recherche dans le centre d’aide pour répondre à votre question</>
    )}
  </div>
)

export default ToolCallMessage
