import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'
import { marked } from 'marked'
import classNames from 'classnames'
import type { ChatCompletionMessageToolCall } from 'openai/src/resources/chat/completions'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAssistantPageData } from '@app/web/assistant/getAssistantPageData'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { assistantChatRoleLabels } from '@app/web/assistant/assistantChatRole'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'

export const generateMetadata = (): Metadata => ({
  title: metadataTitle('Assistant - Chat'),
})

const formatParsedArgumentValue = (value: string | boolean | null | number) => {
  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false'
  }

  if (typeof value === 'number') {
    return value.toString()
  }

  return 'null'
}

const Page = async ({
  params: { chatSessionId },
}: {
  params: { chatSessionId: string }
}) => {
  const user = await authenticateUser()

  const data = await getAssistantPageData({ chatSessionId, userId: user.id })

  if (data.chatSession === null) {
    notFound()
  }

  return (
    <div className="fr-px-6v">
      <h1 className="fr-h4">Chat session {chatSessionId} - Debug</h1>
      <h2 className="fr-h6">Messages&nbsp;:</h2>
      {data.chatSession?.messages.map((message) => (
        <Fragment key={message.id}>
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-lg-6">
              <h3 className="fr-text--lg fr-text--bold">
                {assistantChatRoleLabels[message.role]}
              </h3>
              {message.content ? (
                <div
                  className={classNames(
                    'fr-p-4v fr-pb-0 fr-border-radius--8',
                    message.role === 'User'
                      ? 'fr-background-alt--blue-france'
                      : message.role === 'Assistant'
                        ? 'fr-background-alt--green-archipel'
                        : 'fr-background-alt--grey',
                  )}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: marked.parse(message.content, { async: false }),
                    }}
                  />
                </div>
              ) : null}
              {message.toolCalls.length > 0 &&
                message.toolCalls
                  .filter(onlyDefinedAndNotNull)
                  .map((toolCall) => {
                    const typedToolCall =
                      toolCall as unknown as ChatCompletionMessageToolCall & {
                        function: {
                          name: string
                          parsed_arguments: Record<
                            string,
                            string | boolean | null | number
                          >
                        }
                      }

                    return (
                      <div
                        className="fr-p-4v fr-pb-0 fr-background-alt--brown-caramel fr-border-radius--8"
                        key={typedToolCall.id}
                      >
                        <p>
                          Tool call{' '}
                          <strong>{typedToolCall.function.name}</strong>
                          <br />
                        </p>
                        <ul>
                          {Object.entries(
                            typedToolCall.function.parsed_arguments,
                          ).map(([key, value]) => (
                            <li key={key}>
                              {key}: {formatParsedArgumentValue(value)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
            </div>
            <div className="fr-col-12 fr-col-lg-6">
              <pre className="fr-text--xs">
                {JSON.stringify(message, null, 2)}
              </pre>
            </div>
          </div>
          <hr className="fr-separator-4v" />
        </Fragment>
      ))}
    </div>
  )
}

export default Page
