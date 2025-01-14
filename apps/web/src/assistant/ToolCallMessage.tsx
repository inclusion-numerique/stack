import type { ChatCompletionMessageToolCall } from 'openai/src/resources/chat/completions'
import classNames from 'classnames'
import styles from '@app/web/assistant/ChatSession.module.css'
import { Spinner } from '@app/web/ui/Spinner'

const defaultLoadingMessage = 'Je recherche plus d’informations'

const toolsLoadingMessages = {
  general_web_search:
    'Je recherche sur internet pour avoir plus d’informations',
  administration_web_search:
    'Je recherche sur les sites officiels pour avoir plus d’informations',
  centre_aide_rag:
    'Je recherche dans le centre d’aide pour répondre à votre question',
  les_bases_rag:
    'Je recherche sur les bases du numérique d’intérêt général pour répondre à votre question',
}

const ToolCallMessage = ({
  toolCall,
  status,
}: {
  toolCall: ChatCompletionMessageToolCall
  status: 'loading' | 'success' | 'error'
}) => {
  const loadingMessage =
    toolCall.function.name in toolsLoadingMessages
      ? toolsLoadingMessages[
          toolCall.function.name as keyof typeof toolsLoadingMessages // ts does not understand that the key is in the object after the check
        ]
      : defaultLoadingMessage
  return (
    <div
      className={classNames(
        'fr-flex-shrink-1 fr-text--sm',
        styles.messageToolCall,
      )}
      key={toolCall.id}
    >
      {status === 'loading' && (
        <>
          <Spinner size="small" /> <span>{loadingMessage}</span>
        </>
      )}
      {status === 'success' && (
        <>
          <span className="fr-icon-check-line fr-icon--sm fr-text-default--success" />
          <span>{loadingMessage}</span>
        </>
      )}
      {status === 'error' && (
        <>
          <span className="fr-icon-error-line fr-icon--sm fr-text-default--error" />
          <span>{loadingMessage}</span>
        </>
      )}
    </div>
  )
}

export default ToolCallMessage
