import {
  ChatCompletionCreateParams,
  ChatCompletionFunctionCallOption,
  ChatCompletionMessageParam,
} from 'openai/src/resources/chat/completions'
import {
  openAiClient,
  openAiClientConfiguration,
} from '@app/web/assistant/openAiClient'

export type OpenAiChatMessage = ChatCompletionMessageParam
export type OpenAiFunctionCall =
  | 'none'
  | 'auto'
  | ChatCompletionFunctionCallOption
export type OpenAiFunction = ChatCompletionCreateParams.Function

export const executeOpenAiChatStream = async ({
  onChunk,
  messages,
  functionCall,
  functions,
}: {
  messages: OpenAiChatMessage[]
  onChunk: (chunk: string) => void
  functionCall?: OpenAiFunctionCall
  functions?: OpenAiFunction[]
}) => {
  const chatStreamResponse = await openAiClient.chat.completions.create({
    model: openAiClientConfiguration.chatModel,
    messages,
    function_call: functionCall,
    functions,
    stream: true,
  })

  let reponse = ''

  console.log('STREAM RESPONSE', chatStreamResponse)

  for await (const chunk of chatStreamResponse) {
    console.log('CHUNK', chunk)

    const { content } = chunk.choices[0].delta

    if (content !== undefined && content !== null) {
      const streamText = content
      onChunk(streamText)
      reponse += streamText
    }
  }
  return reponse
}

export const executeOpenAiChat = async ({
  messages,
  functionCall,
  functions,
}: {
  messages: OpenAiChatMessage[]
  functionCall?: OpenAiFunctionCall
  functions?: OpenAiFunction[]
}) => {
  const chatResponse = await openAiClient.chat.completions.create({
    model: 'mistral-nemo-instruct-2407',
    messages,
    function_call: functionCall,
    functions,
    stream: false,
  })

  return chatResponse
}
