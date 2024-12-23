import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getAssistantPageData } from '@app/web/assistant/getAssistantPageData'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import { Fragment } from 'react'

export const generateMetadata = (): Metadata => ({
  title: metadataTitle('Assistant - Chat'),
})

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
    <div>
      <h1 className="fr-h4">Chat session {chatSessionId} - Debug</h1>
      <h2 className="fr-h6">Messages&nbsp;:</h2>
      {data.chatSession?.messages.map((message) => (
        <Fragment key={message.id}>
          <pre className="fr-text--xs">{JSON.stringify(message, null, 2)}</pre>
          <hr className="fr-separator-4v" />
        </Fragment>
      ))}
    </div>
  )
}

export default Page
