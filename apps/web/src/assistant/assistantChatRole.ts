import type { AssistantChatRole } from '@prisma/client'
import type { OpenAiChatRole } from '@app/web/assistant/openAiChat'

export const assistantChatRoleLabels: { [key in AssistantChatRole]: string } = {
  System: 'Système',
  User: 'Utilisateur',
  Assistant: 'Assistant',
  Tool: 'Outil',
  Function: 'Fonction',
}

export const assistantChatRoleToOpenAiRole = {
  System: 'system',
  User: 'user',
  Assistant: 'assistant',
  Tool: 'tool',
  Function: 'function',
} as const satisfies {
  [key in AssistantChatRole]: OpenAiChatRole
}

export const openAiRoleToAssistantChatRole = {
  system: 'System',
  user: 'User',
  assistant: 'Assistant',
  tool: 'Tool',
  function: 'Function',
} as const satisfies {
  [key in OpenAiChatRole]: AssistantChatRole
}
