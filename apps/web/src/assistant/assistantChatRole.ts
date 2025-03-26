import type { AssistantChatRole } from '@prisma/client'

export type AiSdkChatRole = 'system' | 'user' | 'assistant' | 'tool'

export const assistantChatRoleLabels: { [key in AssistantChatRole]: string } = {
  System: 'Système',
  User: 'Utilisateur',
  Assistant: 'Assistant',
  Tool: 'Outil',
}

export const assistantChatRoleToAiSdkRole = {
  System: 'system',
  User: 'user',
  Assistant: 'assistant',
  Tool: 'tool',
} as const satisfies {
  [key in AssistantChatRole]: AiSdkChatRole
}

export const aiSdkRoleToAssistantChatRole = {
  system: 'System',
  user: 'User',
  assistant: 'Assistant',
  tool: 'Tool',
} as const satisfies {
  [key in AiSdkChatRole]: AssistantChatRole
}
