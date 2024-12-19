import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import AssistantPageContent from '@app/web/assistant/AssistantPageContent'
import { getAssistantPageData } from '@app/web/assistant/getAssistantPageData'
import { authenticateUser } from '@app/web/auth/authenticateUser'

export const generateMetadata = (): Metadata => ({
  title: metadataTitle('Assistant - Chat'),
})

/**
 * Displays the chat page without an existing chat session, it will be created on the first user message
 * and the user will be redirected to the chat session page with the chatSessionId
 */
const Page = async () => {
  console.log('PAGE BOOT CHAT')
  const user = await authenticateUser()
  console.log('USER IN PAGE', user)
  const data = await getAssistantPageData({ userId: user.id })

  return <AssistantPageContent data={data} user={user} />
}

export default Page
