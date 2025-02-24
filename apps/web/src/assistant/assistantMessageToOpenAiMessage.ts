import {
  assistantChatRoleToOpenAiRole,
  openAiRoleToAssistantChatRole,
} from '@app/web/assistant/assistantChatRole'
import type { OpenAiChatMessage } from '@app/web/assistant/openAiChat'
import type { AssistantChatMessage, Prisma } from '@prisma/client'
import type { InputJsonObject } from '@prisma/client/runtime/library'
import {
  ChatCompletionAssistantMessageParam,
  ChatCompletionDeveloperMessageParam,
  ChatCompletionFunctionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionSystemMessageParam,
  ChatCompletionToolMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/src/resources/chat/completions'
import { v4 } from 'uuid'

export const assistantMessageToOpenAiMessage = ({
  role,
  content,
  name,
  refusal,
  toolCallId,
  toolCalls,
}: Pick<
  AssistantChatMessage,
  'content' | 'role' | 'refusal' | 'name' | 'toolCalls' | 'toolCallId'
>): OpenAiChatMessage => {
  if (role === 'Tool') {
    return {
      content: content ?? '',
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

  if (role === 'Assistant') {
    const message: ChatCompletionAssistantMessageParam = {
      content: content ?? '',
      role: 'assistant',
    }

    if (name) {
      message.name = name
    }
    if (refusal) {
      message.refusal = refusal
    }
    if (toolCalls && toolCalls.length > 0) {
      message.tool_calls =
        toolCalls as unknown as ChatCompletionMessageToolCall[]
    }

    return message
  }

  if (role === 'User') {
    return {
      content: content ?? '',
      role: 'user',
      name: name ?? undefined,
    } satisfies ChatCompletionUserMessageParam
  }

  return {
    content: content ?? '',
    role: assistantChatRoleToOpenAiRole[role],
    name: name ?? undefined,
  } satisfies
    | ChatCompletionSystemMessageParam
    | ChatCompletionDeveloperMessageParam
}

export const openAiMessageToAssistantChatMessage = (
  message: OpenAiChatMessage,
  { chatSessionId }: { chatSessionId: string },
) =>
  ({
    id: v4(),
    session: { connect: { id: chatSessionId } },
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
  }) satisfies Prisma.AssistantChatMessageCreateInput
