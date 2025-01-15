import { type NextRequest, NextResponse } from 'next/server'
import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { getChatSession } from '@app/web/assistant/getChatSession'
import {
  executeChatInteraction,
  OpenAiChatMessage,
} from '@app/web/assistant/openAiChat'
import { AssistantChatRequestDataValidation } from '@app/web/app/api/assistant/chat/AssistantChatRequestData'
import {
  assistantMessageToOpenAiMessage,
  openAiMessageToAssistantChatMessage,
} from '@app/web/assistant/assistantMessageToOpenAiMessage'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { mediationAssistantSystemMessage } from '@app/web/assistant/systemMessages'
import { tools } from '@app/web/assistant/tools/tools'

const notFoundResponse = () =>
  new Response('', {
    status: 404,
  })

export const POST = async (request: NextRequest) => {
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
  const requestData = AssistantChatRequestDataValidation.safeParse(body)

  if (!requestData.success) {
    return NextResponse.json(
      {
        error: requestData.error,
      },
      {
        status: 400,
      },
    )
  }

  const { chatSessionId, prompt } = requestData.data

  const chatSession = chatSessionId
    ? await getChatSession(chatSessionId)
    : await prismaClient.assistantChatSession
        .create({
          data: {
            createdById: user.id,
            context: '',
          },
        })
        .then((createdChatSession) => ({ ...createdChatSession, messages: [] }))

  if (!chatSession) {
    return notFoundResponse()
  }

  // Create the new user prompt message
  await prismaClient.assistantChatMessage.create({
    data: {
      id: v4(),
      sessionId: chatSession.id,
      role: 'User',
      content: prompt,
      name: 'Médiateur numérique',
    },
  })

  // Create the full history of messages
  // with our system message and the session messages
  const messages = [
    // Our system message is always up to date and the first message
    // chatSystemMessageWithContext,
    mediationAssistantSystemMessage,
    // Session history
    ...chatSession.messages.map(assistantMessageToOpenAiMessage),
    // User prompt message
    {
      role: 'user',
      content: prompt,
      name: 'Médiateur numérique',
    },
  ] satisfies OpenAiChatMessage[]

  const { stream } = executeChatInteraction({
    onMessage: async (message) => {
      // TODO do not block the stream for this, should be asynchronous
      await prismaClient.assistantChatMessage.create({
        data: openAiMessageToAssistantChatMessage(message, {
          chatSessionId,
        }),
      })
    },
    messages,
    tools,
  })

  await prismaClient.assistantChatSession.update({
    where: { id: chatSessionId },
    data: {
      updated: new Date(),
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream', // Set the appropriate header for SSE
      'Cache-Control': 'no-cache', // Prevent caching of this response
      Connection: 'keep-alive', // Keep the connection open for streaming
    },
    status: 200,
  })
}
