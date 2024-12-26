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
      <div className="fr-flex fr-width-full fr-direction-column fr-align-items-center fr-justify-content-center fr-height-full">
        <h2>Comment puis-je vous aider ?</h2>
      </div>
    )

  return (
    <>
      {messages.map((message, index) => (
        <ChatMessage
          key={message.id}
          message={message}
          hideAssistantLogo={
            index > 0 && messages.at(index - 1)?.role === 'Assistant'
          }
        />
      ))}
    </>
  )
}

export default ChatMessagesList
