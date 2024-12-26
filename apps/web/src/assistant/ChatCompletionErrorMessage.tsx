import React from 'react'
import ChatMessage from '@app/web/assistant/ChatMessage'
import { useChatContext } from '@app/web/assistant/chatStore'

const ChatCompletionErrorMessage = () => {
  const completionError = useChatContext((context) => context.completionError)

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
    />
  )
}

export default ChatCompletionErrorMessage
