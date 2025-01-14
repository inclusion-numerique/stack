'use client'

import React from 'react'
import ChatMessage from '@app/web/assistant/ChatMessage'
import { useChatContext } from '@app/web/assistant/chatStore'

const ChatMessagesList = () => {
  const initialized = useChatContext((context) => context.initialized)
  const messages = useChatContext((context) => context.messages)

  if (!initialized) return null

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
          messageIndex={messageIndex}
        />
      ))}
    </>
  )
}

export default ChatMessagesList
