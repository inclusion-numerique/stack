import { ChatSessionData } from '@app/web/assistant/getChatSession'
import { CoreMessage, UIMessage } from 'ai'

export const assistantMessagesToUiMessages = (
  messages: ChatSessionData['messages'],
): UIMessage[] => {
  const result: UIMessage[] = []

  const toolInvocationsMap = new Map<string, UIMessage['parts'][number]>()

  for (const message of messages) {
    const parts = message.parts as unknown[] as CoreMessage['content']

    if (message.role === 'User') {
      result.push({
        id: message.id,
        role: 'user',
        content: '',
        parts,
        createdAt: message.created,
      })
      continue
    }

    if (message.role === 'Assistant') {
      const messageParts: UIMessage['parts'] = []

      for (const part of parts) {
        if (typeof part === 'string') {
          messageParts.push({
            type: 'text',
            text: part,
          })
          continue
        }

        if (part.type === 'text') {
          messageParts.push(part)
          continue
        }

        if (part.type === 'tool-call') {
          const toolInvocationPart: UIMessage['parts'][number] & {
            type: 'tool-invocation'
          } = {
            type: 'tool-invocation',
            toolInvocation: {
              state: 'call',
              toolCallId: part.toolCallId,
              toolName: part.toolName,
              args: part.type === '',
            },
          }
          // we store in map to update the call with later tool result parts
          toolInvocationsMap.set(part.toolCallId, toolInvocationPart)
          messageParts.push(toolInvocationPart)
          continue
        }
      }

      result.push({
        id: message.id,
        role: 'assistant',
        content: '',
        // Sometimes we get empty text parts, we should not render them
        parts: messageParts.filter((part) => part.type !== 'text' || part.text),
        createdAt: message.created,
      })
      continue
    }

    if (message.role === 'Tool') {
      for (const toolPart of parts) {
        if (typeof toolPart === 'string' || toolPart.type !== 'tool-result') {
          continue
        }
        // No tool result in UI, we have to find the corresponding tool invocation
        // and update with the result
        if (!toolPart.result) {
          continue
        }

        const toolInvocationPart = toolInvocationsMap.get(toolPart.toolCallId)
        if (
          !toolInvocationPart ||
          toolInvocationPart.type !== 'tool-invocation'
        ) {
          continue
        }

        toolInvocationPart.toolInvocation = {
          ...toolInvocationPart.toolInvocation,
          state: 'result',
          result: toolPart.result,
        }
      }
    }
  }

  return result
}
