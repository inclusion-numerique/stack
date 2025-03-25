import { openAiRoleToAssistantChatRole } from '@app/web/assistant/assistantChatRole'
import type { OpenAiChatMessage } from '@app/web/assistant/openAiChat'
import type { AssistantChatMessage, Prisma } from '@prisma/client'
import type { InputJsonObject } from '@prisma/client/runtime/library'
import { CoreAssistantMessage, CoreMessage, CoreToolMessage } from 'ai'
import { ChatCompletionUserMessageParam } from 'openai/src/resources/chat/completions'
import { v4 } from 'uuid'

export const assistantMessageToAiSdkMessage = ({
  role,
  content,
  // name,
  // refusal,
  toolCallId,
  toolCalls,
}: Pick<
  AssistantChatMessage,
  'content' | 'role' | 'refusal' | 'name' | 'toolCalls' | 'toolCallId'
>): CoreMessage => {
  if (role === 'Tool') {
    return {
      role: 'tool',
      content: [
        {
          toolName: 'todo',
          result: content ?? '',
          toolCallId: toolCallId ?? 'unknown',
          type: 'tool-result',
        },
      ],
    } satisfies CoreToolMessage
  }

  if (role === 'Assistant') {
    const message: CoreAssistantMessage = {
      content: content ?? '',
      role: 'assistant',
    }

    if (toolCalls && toolCalls.length > 0) {
      // biome-ignore lint/suspicious/noConsole: used until feature is in production
      console.log('TOOL CALL MESSAGE', toolCalls)
      message.content = [
        {
          type: 'tool-call',
          toolName: 'todo',
          toolCallId: toolCallId ?? 'unknown',
          args: {},
        },
      ]
    }

    return message
  }

  if (role === 'User') {
    return {
      content: content ?? '',
      role: 'user',
    } satisfies ChatCompletionUserMessageParam
  }

  throw new Error(`Cannot convert message for unknown chat role ${role}`)
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
