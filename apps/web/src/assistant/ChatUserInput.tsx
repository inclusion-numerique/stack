'use client'

import classNames from 'classnames'
import InputFormField from '@app/ui/components/Form/InputFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useScrollToBottom } from '@app/ui/hooks/useScrollToBottom'
import type { AssistantChatRequestData } from '@app/web/app/api/assistant/chat/AssistantChatRequestData'
import { assistantEndpoints } from '@app/web/assistant/assistantEndpoints'
import { chatStore, useChatContext } from '@app/web/assistant/chatStore'
import type { ChatSessionData } from '@app/web/assistant/getChatSession'
import { trpc } from '@app/web/trpc'
import styles from '@app/web/assistant/ChatSession.module.css'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { replaceRouteWithoutRerender } from '@app/web/utils/replaceRouteWithoutRerender'
import { decodeStreamChunk } from '@app/web/assistant/decodeStreamChunk'

/**
 * User interaction with the chat and completion execution logic
 */
const ChatUserInput = ({
  chatSession,
  messagesContainerRef,
}: {
  // Used to initialize the state
  chatSession: ChatSessionData | null | undefined

  // Used to scroll to the bottom of the messages
  messagesContainerRef: React.RefObject<HTMLDivElement>
}) => {
  // TODO Generate session title on completion when user and assistant messages > 1 each
  // const _generateSessionTitleMutation =
  //   trpc.assistant.generateSessionTitle.useMutation()

  const createSessionMutation = trpc.assistant.createSession.useMutation()

  const chatSessionId = useChatContext((context) => context.chatSessionId)
  const isGenerating = useChatContext((context) => context.isGenerating)
  const isSendingMessage = useChatContext((context) => context.isSendingMessage)

  const { scrollToBottom } = useScrollToBottom({
    containerRef: messagesContainerRef,
    enabled: isGenerating,
  })

  const createChatSession = async () => {
    const createSessionResponse = await createSessionMutation.mutateAsync()
    const newChatSessionId = createSessionResponse.id
    replaceRouteWithoutRerender(`/assistant/chat/${newChatSessionId}`)
    chatStore.send({
      type: 'chatSessionCreated',
      chatSessionId: newChatSessionId,
    })

    return { newChatSessionId }
  }

  useEffect(() => {
    console.log('RESETING CHAT SESSION', chatSession)
    chatStore.send({
      type: 'resetChatSession',
      chatSession,
    })
  }, [chatSession])

  const form = useForm<{ prompt: string }>()

  // Stream controller
  const completionStreamControllerRef = useRef<AbortController | null>(null)

  const onAbort = () => {
    if (completionStreamControllerRef.current) {
      completionStreamControllerRef.current.abort()
    }
  }

  const onSubmit = form.handleSubmit(async (data) => {
    if (isGenerating || isSendingMessage) return

    const prompt = data.prompt?.trim()

    if (!prompt) return

    const controller = new AbortController() // To be able to cancel the fetch request
    completionStreamControllerRef.current = controller

    chatStore.send({ type: 'userMessageSubmitted' })

    let streamChatSessionId = chatSessionId

    // Create a new chat session if none exists before sending the user message
    if (!streamChatSessionId) {
      const createdChatSession = await createChatSession()
      streamChatSessionId = createdChatSession.newChatSessionId
    }

    const promptData: AssistantChatRequestData = {
      prompt,
      chatSessionId: streamChatSessionId,
    }

    try {
      const response = await fetch(assistantEndpoints.chat, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream',
        },
        body: JSON.stringify(promptData),
        signal: controller.signal,
      })

      // Start the completion stream
      chatStore.send({ type: 'completionStreamStarted', prompt })
      form.reset({ prompt: '' })

      // Read the response stream chunks
      const reader = response.body?.getReader()
      if (!reader) {
        chatStore.send({
          type: 'completionErrored',
          error: 'No stream in response',
        })
        return
      }

      // eslint-disable-next-line no-constant-condition
      while (true) {
        // eslint-disable-next-line no-await-in-loop
        const { done, value } = await reader.read()
        if (done) break

        const chunks = decodeStreamChunk(value)

        for (const chunk of chunks) {
          chatStore.send({ type: 'completionStreamChunkReceived', chunk })
          scrollToBottom()
        }
      }

      // Completion stream ended
      chatStore.send({ type: 'completionStreamEnded' })
    } catch (error) {
      console.error('Response stream error:', error)

      // This is an expected error, the user aborted the request
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (
        !!error &&
        typeof error === 'object' &&
        'name' in error &&
        error.name === 'AbortError'
      ) {
        // no op
      } else {
        chatStore.send({
          type: 'completionErrored',
          error: 'Une erreur est survenue 🙁, veuillez réessayer.',
        })
      }
    }

    // Cleanup function to abort fetch on unmount
    return () => controller.abort()
  })

  return (
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
          {isGenerating ? (
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
                isSendingMessage,
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
  )
}

export default withTrpc(ChatUserInput)
