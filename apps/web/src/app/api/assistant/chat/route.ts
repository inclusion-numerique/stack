import { type NextRequest, NextResponse } from 'next/server'
import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { getChatSession } from '@app/web/assistant/getChatSession'
import {
  executeOpenAiChatStream,
  OpenAiChatMessage,
} from '@app/web/assistant/openAiChat'
import { AssistantChatRequestDataValidation } from '@app/web/app/api/assistant/chat/AssistantChatRequestData'
import { assistantMessageToOpenAiMessage } from '@app/web/assistant/assistantMessageToOpenAiMessage'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { tools } from '@app/web/assistant/tools'
import { chatSystemMessage } from '@app/web/assistant/systemMessages'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'

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
    },
  })

  // Create the full history of messages
  // with our system message and the session messages
  const messages = [
    // Our system message is always up to date and the first message
    chatSystemMessage,
    // Session history
    ...chatSession.messages.map(assistantMessageToOpenAiMessage),
    // User prompt message
    {
      role: 'user',
      content: prompt,
    },
  ] satisfies OpenAiChatMessage[]

  const stream = new ReadableStream({
    start(controller) {
      executeOpenAiChatStream({
        messages,
        onChunk: (choice) => {
          // TODO send more info on the choice to indicate if client must display that
          // the assistant is executing a tool call
          if (onlyDefinedAndNotNull(choice.delta.content)) {
            controller.enqueue(choice.delta.content)
          }
        },
        onToolCall: (choice) => {
          // TODO start a tool call ? or wait for the end of the execution in the then ?
          // TODO implement the multi-shot tool call and abstract the stream
          console.log('ON TOOL CALL IN route.ts', choice)
        },
        tools,
      })
        .then((response) => {
          controller.close()
          // Add the assistant response
          // TODO function calls, additional params etc ...
          return prismaClient.assistantChatMessage.create({
            data: {
              id: v4(),
              sessionId: chatSession.id,
              role: 'Assistant',
              content: response.message,
              toolCalls: response.toolCalls,
              finishReason: response.finishReason,
            },
          })
        })
        .catch((error) => controller.error(error))
    },
    cancel() {
      console.warn('chat response stream cancelled by client.')
    },
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
