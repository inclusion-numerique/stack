import React from 'react'
import ChatMessage from '@app/web/assistant/ChatMessage'
import {
  useCompletionError,
  useLastMessageRole,
} from '@app/web/assistant/hooks/useAssistantChatController'

const ChatCompletionErrorMessage = () => {
  const completionError = useCompletionError()
  const previousMessageRole = useLastMessageRole()

  if (!completionError) return null
  return (
    <ChatMessage
      key="error"
      message={{
        id: 'error',
        role: 'Assistant',
        content: completionError,
        toolCalls: [],
        finishReason: null,
        created: new Date(),
        sessionId: 'error-message',
        name: null,
        refusal: null,
        toolCallId: null,
      }}
      previousMessageRole={previousMessageRole}
    />
  )
}

export default ChatCompletionErrorMessage
