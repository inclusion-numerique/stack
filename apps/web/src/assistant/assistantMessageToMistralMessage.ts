import type { AssistantChatMessage } from '@prisma/client'
import { OpenAiChatMessage } from '@app/web/assistant/openAiChat'

export const assistantMessageToMistralMessage = ({
  role,
  content,
}: Pick<AssistantChatMessage, 'content' | 'role'>) =>
  ({
    content,
    role: role === 'User' ? 'user' : 'assistant',
  }) satisfies OpenAiChatMessage
