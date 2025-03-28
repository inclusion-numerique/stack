import styles from '@app/web/assistant/components/ChatThread.module.css'
import { agenticSearchToolName } from '@app/web/assistant/tools/agenticSearchToolConfig'
import { centreAideRagToolName } from '@app/web/assistant/tools/centreAideRagToolConfig'
import { meteoToolName } from '@app/web/assistant/tools/meteoToolConfig'
import { Spinner } from '@app/web/ui/Spinner'
import type { ToolInvocation } from 'ai'
import classNames from 'classnames'

const defaultLoadingMessage = 'Je recherche plus d’informations'

const toolsLoadingMessages = {
  [meteoToolName]: 'Je consulte les données météorologiques',
  [agenticSearchToolName]: 'Je recherche sur internet',
  [centreAideRagToolName]: 'Je recherche dans le centre d’aide',
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
