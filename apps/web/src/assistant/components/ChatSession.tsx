'use client'

import { useChat } from '@ai-sdk/react'
import { useScrollToBottom } from '@app/ui/hooks/useScrollToBottom'
import { createToast } from '@app/ui/toast/createToast'
import ChatCompletionErrorMessage from '@app/web/assistant/components/ChatCompletionErrorMessage'
import ChatMessagesList from '@app/web/assistant/components/ChatMessagesList'
import ChatUserInput from '@app/web/assistant/components/ChatUserInput'
import { useAssistantChatPersistence } from '@app/web/assistant/hooks/useAssistantChatPersistence'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { Message } from 'ai'
import React, { useRef, type FormEventHandler, useEffect } from 'react'
import { v4 } from 'uuid'
import styles from './ChatSession.module.css'

const ChatSession = ({
  initialMessages,
  chatSessionId,
}: {
  initialMessages: Message[]
  chatSessionId: string
}) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const { persistMessages } = useAssistantChatPersistence({
    initialMessages,
    chatSessionId,
  })

  const messagesRef = useRef(initialMessages ?? [])

  const {
    append,
    messages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    status,
    stop,
  } = useChat({
    id: chatSessionId,
    api: '/api/assistant/chat',
    initialMessages: initialMessages ?? undefined,
    maxSteps: 1,
    sendExtraMessageFields: true,
    generateId: () => v4(),
    onError: (error) => {
      // biome-ignore lint/suspicious/noConsole: used until feature is in production
      console.error('CHAT STREAM ON ERROR', error)
      createToast({
        message: 'Une erreur est survenue',
        priority: 'error',
      })
    },
    experimental_prepareRequestBody: ({ messages, id, requestData }) => ({
      message: messages[messages.length - 1],
      id,
      data: requestData,
    }),
    onFinish: (message, { usage, finishReason }) => {
      const allMessages = [...messagesRef.current, message]

      persistMessages({ messages: allMessages })
      console.log('FRONTEND FINISH', message)
      console.log('FRONTEND FINISH MESSAGES', messages)
      console.log('FINISH MESSAGES REF', messagesRef.current)
      console.log('Finish details', { usage, finishReason })

      // We want to retrigger the chat if the last message from the assistant is a tool result
      const lastMessagePart = message.parts.at(-1)
      const shouldRetriggerChat =
        !!lastMessagePart &&
        finishReason === 'tool-calls' &&
        lastMessagePart.type === 'tool-invocation' &&
        lastMessagePart.toolInvocation.state === 'result'

      console.log('FINISH SHOULD RELAUNCH WITHOUT TOOLS ?', {
        lastMessagePart,
        shouldRetriggerChat,
      })
      if (shouldRetriggerChat) {
        // if we rettrigger the chat, we should disable tool execution
        append(message, {
          data: {
            toolChoice: 'none',
          },
        })
      }
    },
  })

  if (messagesRef.current.length !== messages.length) {
    messagesRef.current = messages
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    handleSubmit(event)
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
