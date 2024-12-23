import type { AssistantChatMessage, Prisma } from '@prisma/client'
import {
  ChatCompletionAssistantMessageParam,
  ChatCompletionDeveloperMessageParam,
  ChatCompletionFunctionMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletionToolMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/src/resources/chat/completions'
import type { OpenAiChatMessage } from '@app/web/assistant/openAiChat'
import {
  assistantChatRoleToOpenAiRole,
  openAiRoleToAssistantChatRole,
} from '@app/web/assistant/assistantChatRole'
import { v4 } from 'uuid'
import type { InputJsonObject } from '@prisma/client/runtime/library'

export const assistantMessageToOpenAiMessage = ({
  role,
  content,
  name,
  refusal,
  toolCallId,
}: Pick<
  AssistantChatMessage,
  'content' | 'role' | 'refusal' | 'name' | 'toolCalls' | 'toolCallId'
>): OpenAiChatMessage => {
  if (role === 'Tool') {
    return {
      content,
      role: 'tool',
      tool_call_id: toolCallId ?? 'unknown',
    } satisfies ChatCompletionToolMessageParam
  }

  // deprecated but some providers may still use it
  if (role === 'Function') {
    return {
      content,
      role: 'function',
      name: name ?? 'unknown',
    } satisfies ChatCompletionFunctionMessageParam
  }

  return {
    role: assistantChatRoleToOpenAiRole[role],
    content,
    name: name ?? undefined,
    refusal: refusal ?? undefined,
  } satisfies
    | ChatCompletionSystemMessageParam
    | ChatCompletionUserMessageParam
    | ChatCompletionAssistantMessageParam
    | ChatCompletionDeveloperMessageParam
}

export const openAiMessageToAssistantChatMessage = (
  message: OpenAiChatMessage,
  { chatSessionId }: { chatSessionId: string },
) =>
  ({
    id: v4(),
    sessionId: chatSessionId,
    role: openAiRoleToAssistantChatRole[message.role],
    content: message.content as string,
    name: 'name' in message ? message.name : undefined,
    refusal: 'refusal' in message ? message.refusal : undefined,
    finishReason:
      'finish_reason' in message
        ? (message.finish_reason as string)
        : undefined,
    toolCalls:
      'tool_calls' in message
        ? (message.tool_calls as unknown as InputJsonObject[])
        : undefined,
  }) satisfies Prisma.AssistantChatMessageUncheckedCreateInput
