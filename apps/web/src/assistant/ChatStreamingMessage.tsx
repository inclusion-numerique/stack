'use client'

import React from 'react'
import ChatMessage from '@app/web/assistant/ChatMessage'
import {
  useCurrentToolCalls,
  useLastMessageRole,
  useStreamingMessage,
} from '@app/web/assistant/hooks/useAssistantChatController'

const created = new Date() // no need for a real created date for the streaming message

/**
 * Displays the chat completion currently being generated
 */
const ChatStreamingMessage = () => {
  const currentToolCalls = useCurrentToolCalls()
  const streamingMessage = useStreamingMessage()
  const lastMessageRole = useLastMessageRole()

  return (
    <>
      {currentToolCalls.length > 0 && (
        <ChatMessage
          previousMessageRole={lastMessageRole}
          isStreaming={streamingMessage === null}
          message={{
            id: 'streaming-message-tool-calls',
            role: 'Assistant',
            content: null,
            toolCalls: currentToolCalls,
            finishReason: null,
            created,
            sessionId: 'streaming-message',
            name: null,
            refusal: null,
            toolCallId: null,
          }}
        />
      )}
      {streamingMessage !== null && (
        <ChatMessage
          previousMessageRole={
            currentToolCalls.length > 0 ? 'Assistant' : lastMessageRole
          }
          isStreaming
          message={{
            id: 'streaming-message-content',
            role: 'Assistant',
            content: streamingMessage,
            toolCalls: [],
            finishReason: null,
            created,
            sessionId: 'streaming-message',
            name: null,
            refusal: null,
            toolCallId: null,
          }}
          cursor
        />
      )}
    </>
  )
}

export default ChatStreamingMessage
