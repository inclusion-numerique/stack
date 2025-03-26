import ChatMessageAgenticSearchToolResult from '@app/web/assistant/ChatMessageAgenticSearchToolResult'
import ChatMessageGenericToolResult from '@app/web/assistant/ChatMessageGenericToolResult'
import ToolCallMessage from '@app/web/assistant/ToolCallMessage'
import { agenticSearchToolName } from '@app/web/assistant/tools/agenticSearchToolConfig'
import { UIMessage } from 'ai'

const ChatMessageToolInvocationPart = ({
  part: { toolInvocation },
}: {
  part: UIMessage['parts'][number] & { type: 'tool-invocation' }
}) => {
  if (toolInvocation.state !== 'result') {
    return <ToolCallMessage toolInvocation={toolInvocation} />
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
