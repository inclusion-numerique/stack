'use client'

import React, { useRef } from 'react'
import type { ChatSessionData } from '@app/web/assistant/getChatSession'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import ChatMessagesList from '@app/web/assistant/ChatMessagesList'
import ChatStreamingMessage from '@app/web/assistant/ChatStreamingMessage'
import ChatCompletionErrorMessage from '@app/web/assistant/ChatCompletionErrorMessage'
import ChatUserInput from '@app/web/assistant/ChatUserInput'
import styles from './ChatSession.module.css'

const ChatSession = ({
  chatSession,
}: {
  chatSession: ChatSessionData | null | undefined
}) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className={styles.sessionContainer}>
      <div className={styles.messagesContainer} ref={messagesContainerRef}>
        <div className={styles.messages}>
          <ChatMessagesList />
          <ChatStreamingMessage />
          <ChatCompletionErrorMessage />
          {/* This div is used as an anchor for scrolling to the bottom */}
          <div />
        </div>
      </div>
      <ChatUserInput
        chatSession={chatSession}
        messagesContainerRef={messagesContainerRef}
      />
    </div>
  )
}

export default withTrpc(ChatSession)
