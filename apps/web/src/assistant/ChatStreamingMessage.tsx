'use client'

import React from 'react'
import ChatMessage from '@app/web/assistant/ChatMessage'
import {
  useCurrentToolCalls,
  useCurrentToolResults,
  useLastMessageRole,
  useStreamingMessage,
} from '@app/web/assistant/hooks/useAssistantChatController'

const created = new Date() // no need for a real created date for the streaming message

/**
 * Displays the chat completion currently being generated
 */
const ChatStreamingMessage = () => {
  const currentToolCalls = useCurrentToolCalls()
  const currentToolResults = useCurrentToolResults()
  const streamingMessage = useStreamingMessage()
  const lastMessageRole = useLastMessageRole()

  // Alternate toolCalls and currentToolResult of the same index

  const toolMessages = currentToolCalls.map((message, index) => ({
    type: 'call' as const,
    index,
    message,
  }))
  const toolResultsMessages = currentToolResults.map((message, index) => ({
    type: 'result' as const,
    index,
    message,
  }))

  // Merge toolCalls and toolResults by index
  const toolMessagesAndResults = [...toolMessages, ...toolResultsMessages].sort(
    (a, b) => a.index - b.index || a.type.localeCompare(b.type),
  )

  return (
    <>
      {toolMessagesAndResults.map(({ type, message, index }) =>
        type === 'call' ? (
          <ChatMessage
            key={`${type}-${index}`}
            previousMessageRole={lastMessageRole}
            isStreaming={streamingMessage === null}
            message={{
              id: 'streaming-message-tool-calls',
              role: 'Assistant',
              content: null,
              toolCalls: [message],
              finishReason: null,
              created,
              sessionId: 'streaming-message',
              name: null,
              refusal: null,
              toolCallId: null,
            }}
          />
        ) : (
          <ChatMessage
            key={`${type}-${index}`}
            previousMessageRole={
              currentToolCalls.length > 0 ? 'Assistant' : lastMessageRole
            }
            isStreaming
            message={{
              id: 'streaming-message-tool-result',
              role: 'Tool',
              content: message,
              toolCalls: [],
              finishReason: null,
              created,
              sessionId: 'streaming-message',
              name: null,
              refusal: null,
              toolCallId: null,
            }}
          />
        ),
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
