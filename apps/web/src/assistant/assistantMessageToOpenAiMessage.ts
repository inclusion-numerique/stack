import type { AssistantChatMessage } from '@prisma/client'
import type {
  ChatCompletionAssistantMessageParam,
  ChatCompletionFunctionMessageParam,
  ChatCompletionSystemMessageParam,
  ChatCompletionToolMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/src/resources/chat/completions'
import type { OpenAiChatMessage } from '@app/web/assistant/openAiChat'
import { assistantChatRoleToOpenAiRole } from '@app/web/assistant/assistantChatRole'

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
}
