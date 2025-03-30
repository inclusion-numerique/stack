import type { ToolInvocation } from 'ai'

const ChatMessageGenericToolResult = ({
  toolInvocation: { result },
}: {
  toolInvocation: ToolInvocation & { state: 'result' }
}) => {
  return (
    <div className="fr-background-alt--green-archipel fr-text--xs fr-border-radius--8 fr-p-4v">
      {JSON.stringify(result, null, 2)}
    </div>
  )
}

export default ChatMessageGenericToolResult
