import type { ProviderOptions } from '@app/web/assistant/ProviderOptions'
import {
  aiSdkRoleToAssistantChatRole,
  assistantChatRoleToAiSdkRole,
} from '@app/web/assistant/assistantChatRole'
import type { AssistantChatMessage, Prisma } from '@prisma/client'
import type { InputJsonValue } from '@prisma/client/runtime/library'
import type {
  CoreAssistantMessage,
  CoreMessage,
  CoreToolMessage,
  CoreUserMessage,
  FilePart,
  ImagePart,
  TextPart,
  UIMessage,
} from 'ai'
import { v4 } from 'uuid'

export const assistantMessageToAiSdkMessage = ({
  id,
  parts,
  providerOptions,
  role,
}: Pick<
  AssistantChatMessage,
  'id' | 'role' | 'parts' | 'providerOptions'
>): CoreMessage & { id: string; providerOptions?: unknown } => {
  return {
    id,
    content: parts as unknown[] as (TextPart | ImagePart | FilePart)[],
    role: assistantChatRoleToAiSdkRole[role],
    providerOptions: (providerOptions || undefined) as
      | ProviderOptions
      | undefined,
  } as CoreMessage & { id: string; providerOptions?: unknown }
}

export const assistantMessageToAiSdkUiMessage = ({
  id,
  parts,
  created,
  role,
}: Pick<
  AssistantChatMessage,
  'id' | 'created' | 'role' | 'parts' | 'providerOptions'
>): UIMessage => {
  return {
    id,
    createdAt: created,
    content: '', // use parts instead
    parts: parts as unknown[] as UIMessage['parts'],
    role: assistantChatRoleToAiSdkRole[role] as UIMessage['role'], // TODO Why no tool role ?
  }
}

export const assistantResponseMessageToPrismaModel = (
  message: (CoreAssistantMessage | CoreToolMessage | CoreUserMessage) & {
    id: string
  },
  { chatSessionId }: { chatSessionId: string },
) =>
  ({
    id: 'id' in message ? (message.id ?? v4()) : v4(),
    sessionId: chatSessionId,
    role: aiSdkRoleToAssistantChatRole[message.role],
    parts: (Array.isArray(message.content)
      ? message.content
      : [
          {
            type: 'text',
            text: message.content,
          },
        ]) as InputJsonValue[],
    providerOptions: message.providerOptions,
  }) satisfies Prisma.AssistantChatMessageCreateManyInput
