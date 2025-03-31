import type { Message } from 'ai'
import { isEqual } from 'lodash-es'

export const messageHasDiff = (a: Message, b: Message) => {
  // basic properties diff
  if (
    a.id !== b.id ||
    a.role !== b.role ||
    (a.content || '') !== (b.content || '')
  ) {
    return true
  }

  if (
    a.parts?.length !== b.parts?.length ||
    a.annotations?.length !== b.annotations?.length ||
    a.experimental_attachments?.length !== b.experimental_attachments?.length
  ) {
    return true
  }

  if (
    !isEqual(a.parts ?? [], b.parts ?? []) ||
    !isEqual(a.annotations ?? [], b.annotations ?? []) ||
    !isEqual(a.experimental_attachments, b.experimental_attachments)
  ) {
    return true
  }

  return false
}

export const filterMessagesWithDiff = ({
  initialMessages,
  messages,
}: {
  initialMessages: Message[]
  messages: Message[]
}) => {
  const initialMessagesById = new Map(
    initialMessages.map((message) => [message.id, message]),
  )
  return messages.filter((message) => {
    const initialMessage = initialMessagesById.get(message.id)
    if (!initialMessage) {
      return true
    }

    return messageHasDiff(initialMessage, message)
  })
}
