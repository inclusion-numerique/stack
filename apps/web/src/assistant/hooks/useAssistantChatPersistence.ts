import type { Message } from 'ai'
import { useCallback, useRef } from 'react'

const uniqueMessageId = (message: Message) =>
  'revisionId' in message ? `${message.id}:${message.revisionId}` : message.id

export const useAssistantChatPersistence = ({
  initialMessages,
}: {
  initialMessages: Message[]
}) => {
  const persistedMessageIds = useRef(
    new Set<string>(initialMessages.map(uniqueMessageId)),
  )

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

      persistedMessageIds.current = new Set([...persistedMessageIds.current])
    },
    [],
  )

  return {
    persistMessages,
  }
}
