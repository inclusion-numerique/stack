import { type NextRequest, NextResponse } from 'next/server'
import { v4 } from 'uuid'
import { assistantMessageToMistralMessage } from '@app/web/assistant/assistantMessageToMistralMessage'
import { prismaClient } from '@app/web/prismaClient'
import { AssistantPromptRequestDataValidation } from '@app/web/app/api/assistant/prompt/AssistantPromptRequestData'
import { getChatSession } from '@app/web/assistant/getChatSession'
import {
  executeOpenAiChat,
  executeOpenAiChatStream,
  OpenAiChatMessage,
} from '@app/web/assistant/openAiChat'

const notFoundResponse = () =>
  new Response('', {
    status: 404,
  })

export const POST = async (request: NextRequest) => {
  // Get prompt from request json body
  const body = await request.json()
  const requestData = AssistantPromptRequestDataValidation.safeParse(body)

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

  const chatSession = await getChatSession(chatSessionId)
  if (!chatSession) {
    return notFoundResponse()
  }

  await prismaClient.assistantChatMessage.create({
    data: {
      id: v4(),
      sessionId: chatSession.id,
      role: 'User',
      content: prompt,
    },
  })

  const systemMessage = {
    role: 'system',
    content:
      'Répond TOUJOURS en français sauf si l’utilisateur demand de traduire',
  } satisfies OpenAiChatMessage

  const messages = [
    systemMessage,
    ...chatSession.messages.map(assistantMessageToMistralMessage),
    {
      role: 'user',
      content: prompt,
    },
  ] satisfies OpenAiChatMessage[]

  console.log('MESSAGES', messages)

  const asStream = false

  if (!asStream) {
    const result = await executeOpenAiChat({
      messages,
    }).catch((error) => ({
      error,
    }))
    console.log('RESULT WITHOUT STREAM', result)

    return NextResponse.json(result)
  }

  const stream = new ReadableStream({
    start(controller) {
      console.log('Start stream')
      executeOpenAiChatStream({
        messages,
        onChunk: (chunk) => controller.enqueue(chunk),
      })
        .then((response) => {
          console.log('Response on prompt route', response)
          controller.close()
          return prismaClient.assistantChatMessage.create({
            data: {
              id: v4(),
              sessionId: chatSession.id,
              role: 'Assistant',
              content: response,
            },
          })
        })
        .catch((error) => controller.error(error))
    },
    cancel() {
      console.log('Stream cancelled by client.')
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
