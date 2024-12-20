import {
  ChatCompletionChunk,
  ChatCompletionMessageParam,
  ChatCompletionTool,
  ChatCompletionToolChoiceOption,
  Delta,
} from 'openai/src/resources/chat/completions'
import {
  openAiClient,
  openAiClientConfiguration,
} from '@app/web/assistant/openAiClient'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'

export type OpenAiChatMessage = ChatCompletionMessageParam
export type OpenAiChatRole = OpenAiChatMessage['role']
export type OpenAiToolChoice = ChatCompletionToolChoiceOption
export type OpenAiTool = ChatCompletionTool
export type OpenAiChunkChoice = ChatCompletionChunk.Choice

export const executeOpenAiChatStream = async ({
  onChunk,
  onToolCall,
  messages,
  toolChoice,
  tools,
}: {
  messages: OpenAiChatMessage[]
  onChunk: (choice: OpenAiChunkChoice) => void
  onToolCall: (choice: OpenAiChunkChoice) => void
  toolChoice?: OpenAiToolChoice
  tools?: OpenAiTool[]
}) => {
  const chatStreamResponse = await openAiClient.chat.completions.create({
    model: openAiClientConfiguration.chatModel,
    messages,
    tool_choice: toolChoice,
    tools,
    stream: true,
  })

  let message = ''
  const toolCalls: Delta.ToolCall[] = []
  let finishReason: OpenAiChunkChoice['finish_reason'] | undefined

  for await (const chunk of chatStreamResponse) {
    if (message === '') {
      console.log('FIRST RAW CHUNK', chunk)
    }
    const choice = chunk.choices.at(0)
    if (!choice) {
      continue
    }
    if (choice.finish_reason) {
      finishReason = choice.finish_reason
    }
    onChunk(choice)

    console.log('CHOICES', chunk.choices)

    const { content, tool_calls: choiceToolCalls } = choice.delta

    if (choiceToolCalls) {
      toolCalls.push(...choiceToolCalls)
    }

    if (onlyDefinedAndNotNull(content)) {
      message += content
    }
  }
  return {
    message,
    toolCalls,
    finishReason,
  }
}

export const executeOpenAiChat = async ({
  messages,
  toolChoice,
  tools,
}: {
  messages: OpenAiChatMessage[]
  toolChoice?: OpenAiToolChoice
  tools?: OpenAiTool[]
}) => {
  const chatResponse = await openAiClient.chat.completions.create({
    model: 'mistral-nemo-instruct-2407',
    messages,
    tool_choice: toolChoice,
    tools,
    stream: false,
  })

  return chatResponse
}
