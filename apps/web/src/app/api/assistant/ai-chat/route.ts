import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { AssistantChatAiSdkRequestDataValidation } from '@app/web/app/api/assistant/chat/AssistantChatAiSdkRequestData'
import { aiSdkAlbertProvider } from '@app/web/assistant/aiSdkAlbertProvider'
import { aiSdkOpenaiProvider } from '@app/web/assistant/aiSdkOpenaiProvider'
import { aiSdkScalewayProvider } from '@app/web/assistant/aiSdkScalewayProvider'
import { assistantMessageToAiSdkMessage } from '@app/web/assistant/assistantMessageToAiSdkMessage'
import { getOrCreateChatSession } from '@app/web/assistant/getChatSession'
import { mediationAssistantSystemMessage } from '@app/web/assistant/systemMessages'
import { agenticSearchAiSdkTool } from '@app/web/assistant/tools/agenticSearchTool'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { prismaClient } from '@app/web/prismaClient'
import { CoreMessage, streamText, tool } from 'ai'
import { type NextRequest, NextResponse } from 'next/server'
import { v4 } from 'uuid'
import z from 'zod'

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

  const { id: chatSessionId, message } = requestData.data

  if (!chatSessionId) {
    return invalidResponse('Chat session id is required')
  }

  const chatSession = await getOrCreateChatSession({ chatSessionId, user })

  if (!chatSession) {
    return notFoundResponse()
  }

  const { configuration } = chatSession

  if (message.role === 'user') {
    // Create the new user prompt message
    await prismaClient.assistantChatMessage.create({
      data: {
        id: v4(),
        sessionId: chatSession.id,
        role: 'User',
        content: message.content ?? '',
      },
    })
  }

  // Create the full history of messages
  // with our system message and the session messages
  const messages = [
    // Session history
    ...chatSession.messages.map(assistantMessageToAiSdkMessage),
    // Last message ?? // TODO is the last tool result already here ?
    message as unknown as CoreMessage,
  ] satisfies CoreMessage[]

  // biome-ignore lint/suspicious/noConsole: used until feature is in production
  console.log('MESSAGES', messages)

  const result = streamText({
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
    toolChoice: 'auto',
    tools: {
      meteo: tool({
        description: 'Obtenir la météo actuelle',
        parameters: z.object({
          location: z.string().describe('La ville ou le code postal'),
        }),
        execute: async ({ location }) => {
          const response = `${location}: il fait beau`
          return response
        },
      }),
      recherche_documentaire: agenticSearchAiSdkTool,
    },
    maxSteps: 1,
    onError: (error) => {
      // biome-ignore lint/suspicious/noConsole: used until feature is in production
      console.error('STREAM ON ERROR', error)
    },
    // maxRetries: 3,
    onStepFinish: (result) => {
      // biome-ignore lint/suspicious/noConsole: used until feature is in production
      console.log('STREAM ON STEP FINISH', result)
    },
    onFinish: (result) => {
      // biome-ignore lint/suspicious/noConsole: used until feature is in production
      console.log('STREAM ON FINISH', result)
    },
  })

  return result.toDataStreamResponse()
}
