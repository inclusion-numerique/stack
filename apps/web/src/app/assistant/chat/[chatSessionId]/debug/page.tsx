import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'
import { marked } from 'marked'
import classNames from 'classnames'
import type { ChatCompletionMessageToolCall } from 'openai/src/resources/chat/completions'
import Accordion from '@codegouvfr/react-dsfr/Accordion'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAssistantPageData } from '@app/web/assistant/getAssistantPageData'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { assistantChatRoleLabels } from '@app/web/assistant/assistantChatRole'
import { onlyDefinedAndNotNull } from '@app/web/utils/onlyDefinedAndNotNull'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'

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

  if (!data.chatSession) {
    notFound()
    return
  }

  return (
    <div className="fr-px-6v">
      <AdministrationTitle icon="fr-icon-chat-2-line">
        Chat session {chatSessionId} - Debug
      </AdministrationTitle>
      <Accordion
        label={`Paramètres utilisés : ${data.chatSession.configuration.title}`}
        className="fr-mb-4v"
      >
        <div
          className="fr-table fr-table--no-scroll fr-table--bordered"
          id="table-bordered-component"
        >
          <div className="fr-table__wrapper">
            <div className="fr-table__container">
              <div className="fr-table__content">
                <table id="table-bordered">
                  <tbody>
                    <tr>
                      <td>Température</td>
                      <td>{data.chatSession.configuration.temperature}</td>
                    </tr>
                    <tr>
                      <td>Top&nbsp;P</td>
                      <td>{data.chatSession.configuration.topP}</td>
                    </tr>
                    <tr>
                      <td>Presence&nbsp;penalty</td>
                      <td>{data.chatSession.configuration.presencePenalty}</td>
                    </tr>
                    <tr>
                      <td>Frequency&nbsp;penalty</td>
                      <td>{data.chatSession.configuration.frequencyPenalty}</td>
                    </tr>
                    <tr>
                      <td>System&nbsp;message</td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html:
                            data.chatSession.configuration.systemMessage?.replaceAll(
                              '\n',
                              '<br>',
                            ) ?? '-',
                        }}
                      />
                    </tr>
                    <tr>
                      <td>Search&nbsp;tool&nbsp;description</td>
                      <td>
                        {data.chatSession.configuration.searchToolDescription}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Accordion>
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
                      __html: marked
                        .parse(message.content, { async: false })
                        .replaceAll('\n', '<br/>'),
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
              <pre className="fr-text--xs fr-overflow-x-auto">
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
