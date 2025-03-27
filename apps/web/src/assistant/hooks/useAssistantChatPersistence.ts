import { trpc } from '@app/web/trpc'
import type { Message } from 'ai'
import { useCallback, useRef } from 'react'

const uniqueMessageId = (message: Message) =>
  'revisionId' in message ? `${message.id}:${message.revisionId}` : message.id

export const useAssistantChatPersistence = ({
  initialMessages,
  chatSessionId,
}: {
  initialMessages: Message[]
  chatSessionId: string
}) => {
  const persistedMessageIds = useRef(
    new Set<string>(initialMessages.map(uniqueMessageId)),
  )

  const mutation = trpc.assistant.persistMessages.useMutation()

  const persistMessages = useCallback(
    async ({
      messages: messageWithPossibleDuplicates,
    }: {
      messages: Message[]
    }) => {
      console.log('PERSIST MESSAGES CALLED', messageWithPossibleDuplicates)

      const messages = [
        ...new Map(
          // We only keep the latest message for each id
          messageWithPossibleDuplicates.map((message) => [message.id, message]),
        ).values(),
      ]

      console.log('PERSIST DEDUPLICATED', messages)

      const notPersistedMessages = messages.filter(
        (message) => !persistedMessageIds.current.has(uniqueMessageId(message)),
      )
      console.log('NOT PERSISTED', notPersistedMessages)

      if (notPersistedMessages.length === 0) {
        return
      }

      const result = await mutation.mutateAsync({
        chatSessionId,
        messages: notPersistedMessages,
      })

      console.log('PERSISTENCE RESULT', result)

      persistedMessageIds.current = new Set([
        ...persistedMessageIds.current,
        ...result.persistedMessages.map(uniqueMessageId),
      ])
    },
    [mutation, chatSessionId],
  )

  return {
    persistMessages,
  }
}
