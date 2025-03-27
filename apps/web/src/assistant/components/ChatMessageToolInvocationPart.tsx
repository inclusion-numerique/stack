import ChatMessageAgenticSearchToolResult from '@app/web/assistant/components/ChatMessageAgenticSearchToolResult'
import ChatMessageGenericToolResult from '@app/web/assistant/components/ChatMessageGenericToolResult'
import ToolCallMessage from '@app/web/assistant/components/ToolCallMessage'
import { agenticSearchToolName } from '@app/web/assistant/tools/agenticSearchToolConfig'
import { repondreToolName } from '@app/web/assistant/tools/repondreToolConfig'
import { UIMessage } from 'ai'

const ChatMessageToolInvocationPart = ({
  part: { toolInvocation },
}: {
  part: UIMessage['parts'][number] & { type: 'tool-invocation' }
}) => {
  if (toolInvocation.state !== 'result') {
    return <ToolCallMessage toolInvocation={toolInvocation} />
  }

  if (toolInvocation.toolName === repondreToolName) {
    return null
  }

  return (
    <>
      <ToolCallMessage toolInvocation={toolInvocation} />
      {toolInvocation.toolName === agenticSearchToolName ? (
        <ChatMessageAgenticSearchToolResult toolInvocation={toolInvocation} />
      ) : (
        <ChatMessageGenericToolResult toolInvocation={toolInvocation} />
      )}
    </>
  )
}

export default ChatMessageToolInvocationPart
