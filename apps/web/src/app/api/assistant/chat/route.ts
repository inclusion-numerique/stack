import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { AssistantChatAiSdkRequestDataValidation } from '@app/web/app/api/assistant/chat/AssistantChatAiSdkRequestData'
import { aiSdkAlbertProvider } from '@app/web/assistant/aiSdkAlbertProvider'
import { aiSdkOpenaiProvider } from '@app/web/assistant/aiSdkOpenaiProvider'
import { aiSdkScalewayProvider } from '@app/web/assistant/aiSdkScalewayProvider'
import {
  assistantMessageToAiSdkMessage,
  assistantResponseMessageToPrismaModel,
} from '@app/web/assistant/assistantMessageToAiSdkMessage'
import { getOrCreateChatSession } from '@app/web/assistant/getChatSession'
import { mediationAssistantSystemMessage } from '@app/web/assistant/systemMessages'
import { agenticSearchTool } from '@app/web/assistant/tools/agenticSearchTool'
import { agenticSearchToolName } from '@app/web/assistant/tools/agenticSearchToolConfig'
import { centreAideRagTool } from '@app/web/assistant/tools/centreAideRagTool'
import { centreAideRagToolName } from '@app/web/assistant/tools/centreAideRagToolConfig'
import { meteoTool } from '@app/web/assistant/tools/meteoTool'
import { meteoToolName } from '@app/web/assistant/tools/meteoToolConfig'
import { repondreTool } from '@app/web/assistant/tools/repondreTool'
import { repondreToolName } from '@app/web/assistant/tools/repondreToolConfig'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { prismaClient } from '@app/web/prismaClient'
import {
  appendResponseMessages,
  type CoreToolMessage,
  type CoreUserMessage,
  streamText,
} from 'ai'
import { type NextRequest, NextResponse } from 'next/server'
import { v4 } from 'uuid'

export const maxDuration = 240
export const dynamic = 'force-dynamic'
export const revalidate = 0

const invalidResponse = (errorMessage: string) =>
  NextResponse.json(
    {
      error: errorMessage,
    },
    {
      status: 400,
    },
  )

const notFoundResponse = () =>
  new Response('', {
    status: 404,
  })

// TODO Enable this if needed ?
const backendPersistence = false

export async function POST(request: NextRequest) {
  const sessionToken = getSessionTokenFromNextRequestCookies(request.cookies)
  const user = await getSessionUserFromSessionToken(sessionToken)

  // For now, only allow admin to access the assistant
  if (user?.role !== 'Admin') {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  // Get prompt from request json body
  const body = (await request.json()) as unknown

  // biome-ignore lint/suspicious/noConsole: used until feature is in production
  console.log('REQUEST BODY', body)

  const requestData = AssistantChatAiSdkRequestDataValidation.safeParse(body)

  if (!requestData.success) {
    return invalidResponse(JSON.stringify(requestData.error, null, 2))
  }

  const { id: chatSessionId, message: rawInputMessage } = requestData.data

  const toolChoice = requestData.data?.data?.toolChoice ?? 'auto'

  const inputMessage = rawInputMessage as (
    | CoreUserMessage
    | CoreToolMessage
  ) & { id: string }

  if (!chatSessionId) {
    return invalidResponse('Chat session id is required')
  }

  const chatSession = await getOrCreateChatSession({ chatSessionId, user })

  if (!chatSession) {
    return notFoundResponse()
  }

  const { configuration } = chatSession

  // biome-ignore lint/suspicious/noConsole: used until feature is in production
  console.log('INPUT MESSAGE', inputMessage)

  // Create the full history of messages
  // with our system message and the session messages
  const messages = [
    // Session history
    ...chatSession.messages.map(assistantMessageToAiSdkMessage),
  ]

  // If the request message is not in the persisted messages list, we add it to the list

  const inputMessageIsNew =
    inputMessage && !messages.find((message) => message.id === inputMessage.id)

  if (inputMessageIsNew) {
    messages.push({
      id: inputMessage.id,
      role: inputMessage.role,
      content: inputMessage.content,
    } as (CoreUserMessage | CoreToolMessage) & { id: string })
  }

  // biome-ignore lint/suspicious/noConsole: used until feature is in production
  console.log('MESSAGES', messages)

  const stream = streamText({
    model:
      ServerWebAppConfig.Assistant.service === 'albert'
        ? aiSdkAlbertProvider(ServerWebAppConfig.Assistant.Albert.chatModel)
        : ServerWebAppConfig.Assistant.service === 'openai'
          ? aiSdkOpenaiProvider('gpt-4o')
          : aiSdkScalewayProvider(
              ServerWebAppConfig.Assistant.Scaleway.chatModel,
            ),
    system: configuration.systemMessage
      ? configuration.systemMessage
      : mediationAssistantSystemMessage.content,
    messages,
    experimental_generateMessageId: () => v4(),
    toolChoice,
    tools: {
      [repondreToolName]: repondreTool,
      [meteoToolName]: meteoTool,
      [agenticSearchToolName]: agenticSearchTool,
      [centreAideRagToolName]: centreAideRagTool,
    },
    maxSteps: 1,
    onError: (error) => {
      // biome-ignore lint/suspicious/noConsole: used until feature is in production
      console.error('STREAM ON ERROR', error)
    },
    // maxRetries: 3,
    onStepFinish: (result) => {
      //biome-ignore lint/suspicious/noConsole: used until feature is in production
      console.log('STREAM ON STEP FINISH', JSON.stringify(result, null, 2))
    },
    onFinish: async (result) => {
      console.log('ON FINISH RESPONSE', result.response.messages)

      console.log(
        'APPENDED MESSAGES',
        appendResponseMessages({
          messages: [],
          responseMessages: result.response.messages,
        }),
      )
      console.log('ON FINISH MODEL', result.response.modelId)

      // On finish argument only has the messages from the assistant
      // biome-ignore lint/suspicious/noConsole: used until feature is in production
      console.log(
        'STREAM ON FINISH',
        JSON.stringify(result.response.messages, null, 2),
      )
      const messagesToPersist = result.response.messages.map((message) =>
        assistantResponseMessageToPrismaModel(message, {
          chatSessionId: chatSession.id,
        }),
      )

      if (inputMessageIsNew) {
        // add input message to the beginning of the list to persist
        messagesToPersist.unshift(
          assistantResponseMessageToPrismaModel(inputMessage, {
            chatSessionId: chatSession.id,
          }),
        )
      }
      // biome-ignore lint/suspicious/noConsole: used until feature is in production
      console.log(`MESSAGES TO PERSIST : ${messagesToPersist.length}`)
      for (const message of messagesToPersist) {
        // biome-ignore lint/suspicious/noConsole: used until feature is in production
        console.log(message)
      }

      // biome-ignore lint/suspicious/noConsole: used until feature is in production
      console.log('BACKEND MESSAGES TO PERSIST', messagesToPersist)
      if (backendPersistence) {
        const persistedMessages =
          await prismaClient.assistantChatMessage.createMany({
            data: messagesToPersist,
          })
      }
    },
  })

  // Disable backpressure and consume the stream even if client disconnects so onFinished is called
  stream.consumeStream()

  return stream.toDataStreamResponse()
}
