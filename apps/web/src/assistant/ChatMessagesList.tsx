'use client'

import ChatMessage from '@app/web/assistant/ChatMessage'
import type { UIMessage } from 'ai'
import React from 'react'

const ChatMessagesList = ({
  messages,
  isStreaming,
}: {
  messages: UIMessage[]
  isStreaming?: boolean
}) => {
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
