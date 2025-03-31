import type { JSONValue } from '@ai-sdk/provider'
import type { AssistantChatMessage, Prisma } from '@prisma/client'
import type { InputJsonValue } from '@prisma/client/runtime/library'
import type { Attachment, Message, UIMessage } from 'ai'

export const chatMessageToAiSdkMessage = ({
  id,
  role,
  created,
  annotations,
  attachments,
  parts,
}: AssistantChatMessage): UIMessage => {
  return {
    id,
    createdAt: created,
    parts: (parts ?? []) as unknown[] as UIMessage['parts'],
    role: role as UIMessage['role'],
    content: '', // TODO is it still needed ?
    annotations:
      annotations.length > 0 ? (annotations as JSONValue[]) : undefined,
    experimental_attachments:
      attachments.length > 0
        ? (attachments as unknown[] as Attachment[])
        : undefined,
  }
}

export const aiSdkMessageToChatMessage = ({
  createdAt,
  parts,
  role,
  annotations,
  content,
  id,
  experimental_attachments,
}: Message): Omit<Prisma.AssistantChatMessageCreateManyInput, 'threadId'> & {
  id: string
} => {
  // We don't want to use the content field, but only parts
  const processedParts =
    !parts && content
      ? [
          {
            type: 'text',
            text: content ?? '',
          },
        ]
      : ((parts ?? []) as unknown[] as Prisma.InputJsonValue[])

  return {
    id,
    created: createdAt,
    parts: processedParts,
    role,
    annotations: annotations as InputJsonValue[],
    attachments: experimental_attachments as unknown[] as InputJsonValue[],
  }
}
