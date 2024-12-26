import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import AssistantPageContent from '@app/web/assistant/AssistantPageContent'
import { getAssistantPageData } from '@app/web/assistant/getAssistantPageData'
import { authenticateUser } from '@app/web/auth/authenticateUser'

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

  return <AssistantPageContent data={data} />
}

export default Page
