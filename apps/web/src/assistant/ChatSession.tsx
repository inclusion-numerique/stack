'use client'

import { useChat } from '@ai-sdk/react'
import { useScrollToBottom } from '@app/ui/hooks/useScrollToBottom'
import { createToast } from '@app/ui/toast/createToast'
import ChatCompletionErrorMessage from '@app/web/assistant/ChatCompletionErrorMessage'
import ChatMessagesList from '@app/web/assistant/ChatMessagesList'
import ChatUserInput from '@app/web/assistant/ChatUserInput'
import type { ChatSessionData } from '@app/web/assistant/getChatSession'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { UIMessage } from 'ai'
import React, { useRef, type FormEventHandler, useEffect } from 'react'
import { v4 } from 'uuid'
import styles from './ChatSession.module.css'

const ChatSession = ({
  chatSession,
  uiMessages,
}: {
  chatSession: ChatSessionData | null
  uiMessages: UIMessage[] | null
}) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    status,
    stop,
  } = useChat({
    id: chatSession?.id,
    api: '/api/assistant/chat',
    initialMessages: uiMessages ?? undefined,
    maxSteps: 3,
    generateId: () => v4(),
    onError: (error) => {
      // biome-ignore lint/suspicious/noConsole: used until feature is in production
      console.error('CHAT STREAM ON ERROR', error)
      createToast({
        message: 'Une erreur est survenue',
        priority: 'error',
      })
    },
    experimental_prepareRequestBody: ({ messages, id }) => ({
      message: messages[messages.length - 1],
      id,
    }),
  })

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    handleSubmit(event, {
      data: {
        chatSessionId: 'b6aa005d-3d3b-4e92-b1de-b7f1d692b060', // TODO FROM URL
      },
    })
  }

  const { scrollToBottom } = useScrollToBottom({
    containerRef: messagesContainerRef,
  })

  // biome-ignore lint/correctness/useExhaustiveDependencies: we want to scroll to bottom when status changes
  useEffect(() => {
    // TODO Disable the effect if user has scrolled upwards ?
    scrollToBottom()
  }, [status, scrollToBottom, messages])

  return (
    <div className={styles.sessionContainer}>
      <div className={styles.messagesContainer} ref={messagesContainerRef}>
        <div className={styles.messages}>
          <ChatMessagesList messages={messages} />
          <ChatCompletionErrorMessage />
          {/* This div is used as an anchor for scrolling to the bottom */}
          <div />
        </div>
      </div>
      <ChatUserInput
        onSubmit={onSubmit}
        status={status}
        error={error}
        stop={stop}
        value={input}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default withTrpc(ChatSession)
