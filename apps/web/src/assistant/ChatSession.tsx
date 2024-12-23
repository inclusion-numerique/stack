'use client'

import { useForm } from 'react-hook-form'
import React, { useEffect, useRef, useState } from 'react'
import InputFormField from '@app/ui/components/Form/InputFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import type { ChatSessionData } from '@app/web/assistant/getChatSession'
import ChatMessage from '@app/web/assistant/ChatMessage'
import { assistantEndpoints } from '@app/web/assistant/assistantEndpoints'
import type { AssistantChatRequestData } from '@app/web/app/api/assistant/chat/AssistantChatRequestData'
import styles from './ChatSession.module.css'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { useRouter } from 'next/navigation'
import { deserializeAssistantChatStreamChunk } from '@app/web/assistant/assistantChatStream'

const ChatSession = ({
  chatSession,
}: {
  chatSession: ChatSessionData | null | undefined
}) => {
  const generateSessionTitleMutation =
    trpc.assistant.generateSessionTitle.useMutation()
  const createSessionMutation = trpc.assistant.createSession.useMutation()
  const router = useRouter()

  const form = useForm<{ prompt: string }>()
  const [isStreamingResponse, setIsStreamingResponse] = useState(false)
  const [isSendingPrompt, setIsSendingPrompt] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [messages, setMessages] = useState(chatSession?.messages ?? [])

  const controllerRef = useRef<AbortController | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottomOfMessages = () => {
    if (
      !isStreamingResponse &&
      messagesContainerRef.current &&
      messagesEndRef.current
    ) {
      // Check if the user has scrolled up
      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight

      if (isScrolledToBottom) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  useEffect(scrollToBottomOfMessages, [messages, isStreamingResponse]) // Dependency array includes messages and isStreamingResponse

  const onAbort = () => {
    if (controllerRef.current) {
      controllerRef.current.abort()
    }
  }

  const [streamingToolCalls, setStreamingToolCalls] = useState<
    { name: string }[]
  >([])
  const streamingResponseMessageRef = useRef<HTMLDivElement>(null)

  const onSubmit = form.handleSubmit(async (data) => {
    if (!data.prompt?.trim()) return

    setError(null)
    const controller = new AbortController() // To be able to cancel the fetch request
    controllerRef.current = controller

    setStreamingToolCalls([])
    setIsSendingPrompt(true)

    let chatSessionId = chatSession?.id

    if (!chatSessionId) {
      const createSessionResponse = await createSessionMutation.mutateAsync()
      chatSessionId = createSessionResponse.id
      router.replace(`/assistant/chat/${chatSessionId}`, { scroll: false })
    }

    const promptData: AssistantChatRequestData = {
      prompt: data.prompt,
      chatSessionId,
    }

    // TODO make a hook with an event emitter to not refresh this page on stream change
    // Or state management ?
    fetch(assistantEndpoints.chat, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify(promptData),
      signal: controller.signal,
    })
      .then(async (response) => {
        setIsSendingPrompt(false)
        form.reset({ prompt: '' })

        const created = new Date()
        setMessages((previousMessages) => [
          ...previousMessages,
          {
            id: new Date().toISOString(),
            content: data.prompt,
            role: 'User',
            sessionId: chatSessionId ?? 'not-created',
            created,
            name: null,
            refusal: null,
            toolCalls: [],
            toolCallId: null,
            finishReason: null,
          },
        ])

        setIsStreamingResponse(true)

        const reader = response.body?.getReader()
        let streamContent = '' // To accumulate streaming response content

        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (!reader) break
          // eslint-disable-next-line no-await-in-loop
          const { done, value } = await reader.read()
          if (done) break

          const rawChunk = new TextDecoder().decode(value)

          // Chunks can be concatenated, we need to split them
          // remove first and last char for the first and last {}
          const chunks = rawChunk
            .slice(1, -1)
            .split('}{')
            .map((chunk) => `{${chunk}}`)

          console.log('RAW CHUNK', rawChunk)
          console.log('CHUNKS', chunks)

          // TODO This can be different things

          const parsedChunks = chunks.map(deserializeAssistantChatStreamChunk)
          console.log('PARSED CHUNKS', parsedChunks)

          for (const chunk of parsedChunks) {
            if (chunk.content) {
              streamContent += chunk.content
            }
            // Add to the currenx t message
            if (streamingResponseMessageRef.current) {
              const htmlWithLineBreaks = (
                streamingResponseMessageRef.current.innerHTML + streamContent
              ).replaceAll('\n', '<br>')
              streamingResponseMessageRef.current.innerHTML = htmlWithLineBreaks
            }

            if (chunk.toolCall) {
              setStreamingToolCalls((previousToolCalls) => [
                ...previousToolCalls,
                chunk.toolCall,
              ])
            }

            scrollToBottomOfMessages()
          }
        }

        setIsStreamingResponse(false)
        // Reset text content when streaming response ends
        // eslint-disable-next-line promise/always-return
        if (streamingResponseMessageRef.current) {
          streamingResponseMessageRef.current.textContent = ''
        }

        setMessages((previousMessages) => [
          ...previousMessages,
          {
            id: new Date().toISOString(),
            content: streamContent,
            role: 'Assistant',
            sessionId: chatSessionId ?? 'not-created',
            created,
            name: null,
            refusal: null,
            toolCalls: [],
            toolCallId: null,
            finishReason: null,
          },
        ])
      })
      .catch((promptError) => {
        console.error('Response stream error:', promptError)

        // This is an expected error, the user aborted the request
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (promptError.name === 'AbortError') {
          // no op
        } else {
          setError('Une erreur est survenue 🙁, veuillez réessayer.')
        }

        setIsStreamingResponse(false)
        setIsSendingPrompt(false)

        // Reset text content if error occurs
        if (streamingResponseMessageRef.current) {
          streamingResponseMessageRef.current.textContent = ''
        }
      })

    // Cleanup function to abort fetch on unmount
    return () => controller.abort()
  })

  return (
    <div className={styles.sessionContainer}>
      <div className={styles.messagesContainer} ref={messagesContainerRef}>
        <div className={styles.messages}>
          {messages.length === 0 && (
            <div className="fr-flex fr-width-full fr-direction-column fr-align-items-center fr-justify-content-center fr-height-full">
              <h2>Comment puis-je vous aider ?</h2>
            </div>
          )}
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              hideAssistantLogo={
                index > 0 && messages.at(index - 1)?.role === 'Assistant'
              }
            />
          ))}
          <ChatMessage
            contentRef={streamingResponseMessageRef}
            style={{ display: isStreamingResponse ? 'block' : 'none' }}
            message={{
              role: 'Assistant',
              content: '',
              toolCalls: streamingToolCalls,
            }}
          />
          {!!error && (
            <ChatMessage
              key="error"
              message={{
                role: 'Assistant',
                content: error,
                toolCalls: [],
              }}
            />
          )}

          {/* This div is used as a marker for scrolling to the bottom */}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className={styles.inputContainer}>
        <form onSubmit={onSubmit}>
          <div
            className={classNames(
              'fr-flex fr-flex-gap-4v fr-align-items-center fr-width-full',
              styles.input,
            )}
          >
            <InputFormField
              className="fr-flex-grow-1 fr-m-0"
              control={form.control}
              path="prompt"
              placeholder="Envoyer un message à l’assistant"
              classes={{
                input: 'fr-input--alt-blue-ecume',
                label: 'fr-display-none',
              }}
            />
            {isStreamingResponse ? (
              <Button
                priority="tertiary"
                iconId="ri-stop-fill"
                type="button"
                className="fr-border-radius--32 fr-px-3v"
                onClick={onAbort}
                title="Arrêter"
              />
            ) : (
              <Button
                priority="primary"
                iconId="fr-icon-check-line"
                type="submit"
                {...buttonLoadingClassname(
                  isSendingPrompt,
                  'fr-border-radius--32',
                )}
                title="Envoyer"
              />
            )}
          </div>
        </form>
        <p className="fr-mt-4v fr-mb-0 fr-text--xs fr-text-mention--grey fr-text--center">
          L’assistant peut faire des erreurs. Vérifiez les informations
          importantes.
        </p>
      </div>
    </div>
  )
}

export default withTrpc(ChatSession)
