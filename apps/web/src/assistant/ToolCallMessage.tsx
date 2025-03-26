import styles from '@app/web/assistant/ChatSession.module.css'
import type { ToolInvocation } from '@app/web/assistant/ToolInvocation'
import { Spinner } from '@app/web/ui/Spinner'
import classNames from 'classnames'

const defaultLoadingMessage = 'Je recherche plus d’informations'

const toolsLoadingMessages = {
  general_web_search:
    'Je recherche sur internet pour avoir plus d’informations',
  administration_web_search:
    'Je recherche sur les sites officiels pour avoir plus d’informations',
  centre_aide_rag:
    'Je recherche dans le centre d’aide pour répondre à votre question',
  les_bases_rag: 'Je recherche sur les bases du numérique d’intérêt général',
}

const ToolCallMessage = ({
  toolInvocation,
}: {
  toolInvocation: ToolInvocation
}) => {
  const loadingMessage =
    toolInvocation.toolName in toolsLoadingMessages
      ? toolsLoadingMessages[
          toolInvocation.toolName as keyof typeof toolsLoadingMessages // ts does not understand that the key is in the object after the check
        ]
      : defaultLoadingMessage

  const objectif =
    toolInvocation.args && 'objectif' in toolInvocation.args
      ? (toolInvocation.args.objectif as string)
      : null

  const message = objectif
    ? `${loadingMessage} pour ${objectif}`
    : loadingMessage

  return (
    <div
      className={classNames(
        'fr-flex-shrink-1 fr-text--sm',
        styles.messageToolCall,
      )}
    >
      {(toolInvocation.state === 'partial-call' ||
        toolInvocation.state === 'call') && (
        <>
          <Spinner size="small" /> <span>{message}</span>
        </>
      )}
      {toolInvocation.state === 'result' && (
        <>
          <span className="fr-icon-check-line fr-icon--sm fr-text-default--success" />
          <span>{message}</span>
        </>
      )}
    </div>
  )
}

export default ToolCallMessage
