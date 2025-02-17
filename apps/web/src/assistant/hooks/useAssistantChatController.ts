import type { SnapshotFromStore } from '@xstate/store/dist/declarations/src/types'
import { useSelector } from '@xstate/store/react'
import { useRef } from 'react'
import { chatStore } from '@app/web/assistant/chatStore'
import type { ChatSessionData } from '@app/web/assistant/getChatSession'
import type { AssistantPageDataChatSessionHistoryItem } from '@app/web/assistant/getAssistantPageData'
import { replaceRouteWithoutRerender } from '@app/web/utils/replaceRouteWithoutRerender'
import { trpc } from '@app/web/trpc'
import type { AssistantChatRequestData } from '@app/web/app/api/assistant/chat/AssistantChatRequestData'
import { assistantEndpoints } from '@app/web/assistant/assistantEndpoints'
import { decodeStreamChunk } from '@app/web/assistant/decodeStreamChunk'
import type { AssistantChatStreamChunk } from '@app/web/assistant/assistantChatStream'

/**
 * This files exports the actions and queries for the chat assistant features
 * It integrates trpc for server state and zustand chatStore for client state
 * And implements the business logic
 */

export const useAssistantChatController = () => {}

// Subscribe to snapshot changes for debugging
chatStore.subscribe((snapshot) => {
  console.info(snapshot.context)
})

/**
 * ACTIONS
 */
export const initialiseChatSession = ({
  chatSession,
  chatSessionHistory,
}: {
  chatSession: ChatSessionData | null
  // For history, null means empty, undefined means "do not reset"
  chatSessionHistory:
    | AssistantPageDataChatSessionHistoryItem[]
    | null
    | undefined
}) => {
  chatStore.send({
    type: 'initializeChatSession',
    chatSession,
    chatSessionHistory,
  })
}

export const useCreateNewChatSession = () => {
  const createSessionMutation = trpc.assistant.createSession.useMutation()

  const createChatSession = async () => {
    const createSessionResponse = await createSessionMutation.mutateAsync()

    console.log('CREATE CHAT SESSION')

    const newChatSessionId = createSessionResponse.chatSession.id
    replaceRouteWithoutRerender(`/assistant/chat/${newChatSessionId}`)
    chatStore.send({
      type: 'chatSessionCreated',
      chatSessionId: newChatSessionId,
    })

    return createSessionResponse
  }

  return {
    createChatSession,
  }
}

export const useSendUserMessage = () => {
  const { createChatSession } = useCreateNewChatSession()

  // Stream controller
  const completionStreamControllerRef = useRef<AbortController | null>(null)

  const abort = () => {
    if (completionStreamControllerRef.current) {
      completionStreamControllerRef.current.abort()
    }
  }

  const sendUserMessage = async ({
    prompt,
    onStreamStarted,
    onChunk,
  }: {
    prompt: string
    onStreamStarted?: () => void
    onChunk?: (chunk: AssistantChatStreamChunk) => void
  }) => {
    const { context } = chatStore.getSnapshot()

    if (context.isGenerating || context.isSendingUserMessage) return

    const trimmedPrompt = prompt.trim()

    if (!trimmedPrompt) return

    let streamChatSessionId = context.chatSessionId

    // Create a new chat session if none exists before sending the user message
    if (!streamChatSessionId) {
      const createdChatSession = await createChatSession()
      console.log('CREATED CHAT SESSION', createdChatSession)
      streamChatSessionId = createdChatSession.chatSession.id
    }

    const controller = new AbortController() // To be able to cancel the fetch request
    completionStreamControllerRef.current = controller

    chatStore.send({ type: 'userMessageSubmitted' })

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
      if (onStreamStarted) {
        onStreamStarted()
      }

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
          if (onChunk) {
            onChunk(chunk)
          }
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
  }

  return {
    sendUserMessage,
    abort,
  }
}

/**
 * QUERIES
 */

export const useChatContext = <T>(
  selector: (snapshot: SnapshotFromStore<typeof chatStore>['context']) => T,
  compare?: (a: T | undefined, b: T) => boolean,
) => useSelector(chatStore, ({ context }) => selector(context), compare)

export const useChatSessionHistory = () =>
  useChatContext(({ chatSessionHistory }) => chatSessionHistory)

export const useChatInitialized = () =>
  useChatContext(({ initialized }) => initialized)

export const useChatMessages = () => useChatContext(({ messages }) => messages)

export const useCompletionError = () =>
  useChatContext((context) => context.completionError)

export const useLastMessageRole = () =>
  useChatContext((context) => context.messages.at(-1)?.role)

export const useIsGenerating = () =>
  useChatContext((context) => context.isGenerating)

export const useIsSendingUserMessage = () =>
  useChatContext((context) => context.isSendingUserMessage)

export const useIsChatSessionEmpty = () =>
  useChatContext((context) => !context.chatSession)

export const useCurrentToolCalls = () =>
  useChatContext((context) => context.currentToolCalls)
export const useCurrentToolResults = () =>
  useChatContext((context) => context.currentToolResults)
export const useStreamingMessage = () =>
  useChatContext((context) => context.streamingMessage)
