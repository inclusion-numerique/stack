'use client'

import { useChat } from '@ai-sdk/react'
import { createToast } from '@app/ui/toast/createToast'
import type { FormEventHandler } from 'react'
import { v4 } from 'uuid'

const AssistantChatSession = () => {
  const { messages, input, handleInputChange, handleSubmit, error, status } =
    useChat({
      api: '/api/assistant/ai-chat',
      initialMessages: [], // TODO FROM PARAMS
      maxSteps: 2,
      generateId: () => v4(),
      onError: (error) => {
        // biome-ignore lint/suspicious/noConsole: used until feature is in production
        console.error('CHAT STREAM ON ERROR', error)
        createToast({
          message: 'Une erreur est survenue',
          priority: 'error',
        })
      },
      experimental_prepareRequestBody: ({ messages, id }) => ({
        message: messages[messages.length - 1],
        id,
      }),
    })

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    handleSubmit(event, {
      data: {
        chatSessionId: 'b6aa005d-3d3b-4e92-b1de-b7f1d692b060', // TODO FROM URL
      },
    })
  }

  const canInput = status === 'ready' || status === 'error'

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      Status: {status}
      <br />
      Error: {error?.message}
      <hr />
      {messages.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return <div key={`${message.id}-${i}`}>{part.text}</div>
              case 'tool-invocation':
                return (
                  <pre key={`${message.id}-${i}`}>
                    {JSON.stringify(part.toolInvocation, null, 2)}
                  </pre>
                )
              default:
                return null
            }
          })}
        </div>
      ))}
      <hr />
      <form onSubmit={onSubmit}>
        <input
          className="fr-input"
          value={input}
          placeholder="Message"
          disabled={!canInput}
          onChange={handleInputChange}
        />
      </form>
    </div>
  )
}

export default AssistantChatSession
