import type { OpenAiChatRole } from '@app/web/assistant/openAiChat'
import type { AssistantChatRole } from '@prisma/client'

export const assistantChatRoleLabels: { [key in AssistantChatRole]: string } = {
  System: 'Système',
  User: 'Utilisateur',
  Assistant: 'Assistant',
  Tool: 'Outil',
  Function: 'Fonction',
  Developer: 'Développeur',
}

export const assistantChatRoleToOpenAiRole = {
  System: 'system',
  User: 'user',
  Assistant: 'assistant',
  Tool: 'tool',
  Function: 'function',
  Developer: 'developer',
} as const satisfies {
  [key in AssistantChatRole]: OpenAiChatRole
}

export const openAiRoleToAssistantChatRole = {
  system: 'System',
  user: 'User',
  assistant: 'Assistant',
  tool: 'Tool',
  function: 'Function',
  developer: 'Developer',
} as const satisfies {
  [key in OpenAiChatRole]: AssistantChatRole
}
