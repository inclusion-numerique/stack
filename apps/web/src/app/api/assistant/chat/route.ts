import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { AssistantChatAiSdkRequestDataValidation } from '@app/web/app/api/assistant/chat/AssistantChatAiSdkRequestData'
import { aiSdkAlbertProvider } from '@app/web/assistant/aiSdkAlbertProvider'
import { aiSdkOpenaiProvider } from '@app/web/assistant/aiSdkOpenaiProvider'
import { aiSdkScalewayProvider } from '@app/web/assistant/aiSdkScalewayProvider'
import { canUseAssistant } from '@app/web/assistant/canUseAssistant'
import { chatMessageToAiSdkMessage } from '@app/web/assistant/chatMessageToAiSdkMessage'
import { getOrCreateChatThread } from '@app/web/assistant/getChatThread'
import { persistMessages } from '@app/web/assistant/persistMessages'
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
import * as Sentry from '@sentry/nextjs'
import {
  type CoreToolMessage,
  type CoreUserMessage,
  type UIMessage,
  appendResponseMessages,
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

export async function POST(request: NextRequest) {
  const sessionToken = getSessionTokenFromNextRequestCookies(request.cookies)
  const user = await getSessionUserFromSessionToken(sessionToken)

  if (!user || !canUseAssistant(user)) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  // Get prompt from request json body
  const body = (await request.json()) as unknown

  const requestData = AssistantChatAiSdkRequestDataValidation.safeParse(body)

  if (!requestData.success) {
    return invalidResponse(JSON.stringify(requestData.error, null, 2))
  }

  const { id: threadId, message: rawInputMessage } = requestData.data

  const toolChoice = requestData.data?.data?.toolChoice ?? 'auto'

  const inputMessage = rawInputMessage as (
    | CoreUserMessage
    | CoreToolMessage
  ) & { id: string }

  if (!threadId) {
    return invalidResponse('Chat session id is required')
  }

  const chatThread = await getOrCreateChatThread({ threadId, user })

  if (!chatThread) {
    return notFoundResponse()
  }

  const { configuration } = chatThread

  // Full history of messages
  // with our system message and the session messages
  const initialMessages = chatThread.messages.map(chatMessageToAiSdkMessage)
  // Messages used to be sent to the chat stream
  const messages = [...initialMessages]

  // If the request message is not in the persisted messages list, we add it to the list
  const inputMessageIsNew =
    inputMessage && !messages.find((message) => message.id === inputMessage.id)

  if (inputMessageIsNew) {
    messages.push({
      id: inputMessage.id,
      role: inputMessage.role,
      content: inputMessage.content,
      createdAt: new Date(),
      parts: [
        {
          type: 'text',
          text: inputMessage.content,
        },
      ],
    } as UIMessage)
  }

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
      console.error('CHAT STREAM ERROR', error)
      Sentry.captureException(error)
    },
    onFinish: async (result) => {
      const appendedMessages = appendResponseMessages({
        messages,
        responseMessages: result.response.messages,
      })

      await persistMessages({
        initialMessages,
        messages: appendedMessages,
        threadId,
      })
    },
  })

  // Disable backpressure and consume the stream even if client disconnects so onFinished is called
  stream.consumeStream()

  return stream.toDataStreamResponse()
}
