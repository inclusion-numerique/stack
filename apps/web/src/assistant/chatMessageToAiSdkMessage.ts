import type { Message, UIMessage } from 'ai'
import type { Prisma, AssistantChatMessage } from '@prisma/client'

export const chatMessageToAiSdkMessage = ({
  id,
  role,
  created,
  annotations,
  attachments,
  content,
  parts,
}: AssistantChatMessage): UIMessage => {
  return {
    id,
    createdAt: created,
    parts: (parts ?? []) as unknown[] as UIMessage['parts'],
    role,
    annotations: annotations.length > 0 ? annotations : undefined,
    content: content || undefined,
    experimental_attachments: attachments.length > 0 ? attachments : undefined,
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
}: Message): Prisma.AssistantChatMessageCreateManyInput & { id: string } => {
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
    annotations,
    content,
    attachments: experimental_attachments,
  }
}
