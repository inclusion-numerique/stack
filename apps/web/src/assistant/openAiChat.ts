import {
  ChatCompletionMessageParam,
  ChatCompletionMessageToolCall,
  ChatCompletionTool,
  ChatCompletionToolChoiceOption,
} from 'openai/src/resources/chat/completions'
import { ChatCompletionChunk } from 'openai/resources'
import { AutoParseableTool } from 'openai/src/lib/parser'
import * as Sentry from '@sentry/nextjs'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'
import {
  OpenAiClienChatModel,
  openAiClient,
  openAiClientConfiguration,
} from '@app/web/assistant/openAiClient'
import { serializeAssistantChatStreamChunk } from '@app/web/assistant/assistantChatStream'
import { AssistantConfiguration } from '@prisma/client'
import { defaultAssistantConfiguration } from '@app/web/assistant/configuration/defaultAssistantConfiguration'
import { agenticSearchToolName } from '@app/web/assistant/tools/agenticSearchToolConfig'

export type OpenAiChatMessage = ChatCompletionMessageParam
export type OpenAiChatRole = OpenAiChatMessage['role']
export type OpenAiToolChoice = ChatCompletionToolChoiceOption
export type OpenAiTool = ChatCompletionTool
export type OpenAiChunkChoice = ChatCompletionChunk.Choice
export type OpenAiToolCall = ChatCompletionMessageToolCall

export type ExecuteOpenAiChatStreamOptions = {
  messages: OpenAiChatMessage[]
  onChunk: (choice: OpenAiChunkChoice) => void
  toolChoice?: OpenAiToolChoice
  tools?: OpenAiTool[]
  model?: OpenAiClienChatModel
}

export const executeOpenAiChatStream = async ({
  onChunk,
  messages,
  toolChoice,
  tools,
  model,
}: ExecuteOpenAiChatStreamOptions) => {
  const chatStreamResponse = await openAiClient.chat.completions.create({
    model: model ?? openAiClientConfiguration.chatModel,
    messages,
    tool_choice: toolChoice,
    tools,
    stream: true,
    parallel_tool_calls: true,
  })

  let message = ''
  const toolCalls = new Map<string, OpenAiToolCall>()
  let currentToolCall: OpenAiToolCall | undefined

  let finishReason: OpenAiChunkChoice['finish_reason'] | undefined

  for await (const chunk of chatStreamResponse) {
    const choice = chunk.choices.at(0)
    if (!choice) {
      continue
    }
    if (choice.finish_reason) {
      finishReason = choice.finish_reason
    }
    onChunk(choice)

    const { content, tool_calls: choiceToolCalls } = choice.delta

    if (choiceToolCalls) {
      const toolCall = choiceToolCalls[0]
      if (toolCall) {
        if (toolCall.id) {
          // First tool call of a stream list of tool calls chunks

          if (!toolCall.type || !toolCall.function?.name) {
            throw new Error('Invalid tool call without type or function name')
          }

          currentToolCall = {
            id: toolCall.id,
            type: toolCall.type,
            function: {
              name: toolCall.function.name,
              arguments: toolCall.function.arguments || '',
            },
          }

          toolCalls.set(toolCall.id, currentToolCall)
        } else {
          // Subsequent tool call of a stream list of tool calls chunks
          if (!currentToolCall) {
            throw new Error('No current tool call to add subsequent tool call')
          }
          currentToolCall.function.arguments +=
            toolCall.function?.arguments || ''
        }
      }
    }

    if (onlyDefinedAndNotNull(content)) {
      message += content
    }
  }
  return {
    message,
    toolCalls: toolCalls.size > 0 ? [...toolCalls.values()] : undefined,
    finishReason,
  }
}

export type StreamChatCompletionResult = Awaited<
  ReturnType<typeof executeOpenAiChatStream>
>

export const executeOpenAiChat = async ({
  messages,
  toolChoice,
  tools,
  model,
}: {
  messages: OpenAiChatMessage[]
  toolChoice?: OpenAiToolChoice
  tools?: OpenAiTool[]
  model?: OpenAiClienChatModel
}) => {
  const chatResponse = await openAiClient.chat.completions.create({
    model: model ?? openAiClientConfiguration.chatModel,
    messages,
    tool_choice: toolChoice,
    tools,
    stream: false,
    parallel_tool_calls: true,
  })

  return chatResponse
}

/**
 * This function will encapsulate tools calls and assistant responses in a single stream
 */
export const executeChatInteraction = ({
  onMessage,
  onToolCall,
  onToolResult,
  onContent,
  messages,
  toolChoice,
  tools,
  model,
  configuration,
}: {
  onMessage: (message: OpenAiChatMessage) => void | Promise<void>
  onToolCall?: (message: ChatCompletionMessageToolCall) => void | Promise<void>
  onToolResult?: (
    message: OpenAiChatMessage & { role: 'tool' },
  ) => void | Promise<void>
  onContent?: (content: string) => void | Promise<void>
  messages: OpenAiChatMessage[]
  toolChoice?: OpenAiToolChoice
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tools: AutoParseableTool<any, true>[]
  maxToolsCalls?: number
  invalidToolCallRetries?: number
  model?: OpenAiClienChatModel
  configuration: AssistantConfiguration
}): { stream: ReadableStream } => {
  // We create the stream that will be returned to the client
  const stream = new ReadableStream({
    start: async (controller) => {
      try {
        const runner = openAiClient.beta.chat.completions
          .runTools({
            model: model ?? openAiClientConfiguration.chatModel,
            messages,
            tools: tools.map((tool) => {
              if (
                tool.function.name === agenticSearchToolName &&
                configuration.searchToolDescription
              ) {
                return {
                  ...tool,
                  function: {
                    ...tool.function,
                    description: configuration.searchToolDescription,
                  },
                }
              }

              return tool
            }),
            tool_choice: toolChoice,
            stream: true,
            parallel_tool_calls: false, // not supported by scaleway or albert models right now
            temperature:
              configuration.temperature ??
              defaultAssistantConfiguration.temperature,
            top_p: configuration.topP ?? defaultAssistantConfiguration.topP,
            frequency_penalty:
              configuration.frequencyPenalty ??
              defaultAssistantConfiguration.frequencyPenalty,
            presence_penalty:
              configuration.presencePenalty ??
              defaultAssistantConfiguration.presencePenalty,
          })
          .on('message', (message) => {
            const toolCall =
              'tool_calls' in message ? message.tool_calls?.at(0) : undefined
            if (toolCall) {
              controller.enqueue(
                serializeAssistantChatStreamChunk({
                  role: 'assistant',
                  toolCall,
                }),
              )
              if (onToolCall) {
                // eslint-disable-next-line no-void
                void onToolCall(toolCall)
              }
            }

            if (message.role === 'tool') {
              controller.enqueue(
                serializeAssistantChatStreamChunk({
                  role: 'tool',
                  content: Array.isArray(message.content)
                    ? message.content.map((part) => part.text).join('') // should never happen foor tool responses
                    : message.content,
                }),
              )
              if (onToolResult) {
                // eslint-disable-next-line no-void
                void onToolResult(message)
              }
            }
            console.log('onMessage', message)
            // eslint-disable-next-line no-void
            void onMessage(message)
          })
          .on('content', (content) => {
            if (!content) {
              return
            }
            controller.enqueue(
              serializeAssistantChatStreamChunk({
                role: 'assistant',
                content,
              }),
            )

            if (onContent) {
              // eslint-disable-next-line no-void
              void onContent(content)
            }
          })
          .on('error', (error) => {
            Sentry.captureException(error)
            controller.error(error)
            console.error('Error in runner stream', error)
          })

        await runner.finalChatCompletion()
        controller.close()
      } catch (error) {
        Sentry.captureException(error)
        controller.error(error)
      }
    },
    cancel() {
      console.warn('chat response stream cancelled by client.')
    },
  })

  return { stream }
}
