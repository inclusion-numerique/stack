'use client'

import ChatMessage from '@app/web/assistant/components/ChatMessage'
import type { UIMessage } from 'ai'
import React from 'react'

const ChatMessagesList = ({
  messages: unprocessedMessages,
  isStreaming,
}: {
  messages: UIMessage[]
  isStreaming?: boolean
}) => {
  // There is some duplicated messages sometimes, we remove them
  // TODO find out why duplicated ? Bug from ai-sdk-react ?
  const messages = new Map(
    unprocessedMessages.map((message) => [message.id, message]),
  )
    .values()
    .map((message) => {
      // we remove the "repondre" tool invocations from message parts
      if (message.role === 'assistant') {
        return {
          ...message,
          parts: message.parts
            .filter(
              (part) =>
                part.type !== 'tool-invocation' ||
                part.toolInvocation.toolName !== 'repondre',
            )
            // Text part should not be empty
            .filter((part) => part.type !== 'text' || part.text),
        }
      }

      return message
    })
    .filter((message) => !!message.content || message.parts.length > 0)
    .toArray()

  if (messages.length === 0)
    return (
      <div className="fr-flex fr-width-full fr-direction-column fr-align-items-center fr-justify-content-center fr-height-full fr-my-auto fr-mt-10v">
        <h2>Comment puis-je vous aider ?</h2>
      </div>
    )

  return (
    <>
      {messages.map((message, messageIndex) => (
        <ChatMessage
          key={message.id}
          message={message}
          previousMessageRole={
            messageIndex > 0 ? messages.at(messageIndex - 1)?.role : undefined
          }
          isStreaming={isStreaming && messageIndex === messages.length - 1}
        />
      ))}
    </>
  )
}

export default ChatMessagesList
