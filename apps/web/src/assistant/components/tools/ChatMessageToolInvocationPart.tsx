import ChatMessageAgenticSearchToolResult from '@app/web/assistant/components/tools/ChatMessageAgenticSearchToolResult'
import ChatMessageCentreAideToolResult from '@app/web/assistant/components/tools/ChatMessageCentreAideToolResult'
import ChatMessageGenericToolResult from '@app/web/assistant/components/tools/ChatMessageGenericToolResult'
import ToolCallMessage from '@app/web/assistant/components/tools/ToolCallMessage'
import { agenticSearchToolName } from '@app/web/assistant/tools/agenticSearchToolConfig'
import { centreAideRagToolName } from '@app/web/assistant/tools/centreAideRagToolConfig'
import type { UIMessage } from 'ai'

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
      ) : toolInvocation.toolName === centreAideRagToolName ? (
        <ChatMessageCentreAideToolResult toolInvocation={toolInvocation} />
      ) : (
        <ChatMessageGenericToolResult toolInvocation={toolInvocation} />
      )}
    </>
  )
}

export default ChatMessageToolInvocationPart
