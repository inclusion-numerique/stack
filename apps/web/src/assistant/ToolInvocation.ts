import type { UIMessage } from 'ai'

export type ToolInvocation = (UIMessage['parts'][number] & {
  type: 'tool-invocation'
})['toolInvocation']
