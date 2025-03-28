import { metadataTitle } from '@app/web/app/metadataTitle'
import AssistantPageContent from '@app/web/assistant/components/AssistantPageContent'
import { getAssistantPageData } from '@app/web/assistant/getAssistantPageData'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import type { Metadata } from 'next'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export const generateMetadata = (): Metadata => ({
  title: metadataTitle('Assistant - Chat'),
})

const Page = async ({
  params: { threadId },
}: {
  params: { threadId: string }
}) => {
  const user = await authenticateUser()

  const data = await getAssistantPageData({ threadId, userId: user.id })

  return <AssistantPageContent data={data} threadId={threadId} />
}

export default Page
