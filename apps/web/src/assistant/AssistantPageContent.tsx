import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import type { AssistantPageData } from '@app/web/assistant/getAssistantPageData'
import ChatSession from '@app/web/assistant/ChatSession'

export const generateMetadata = (): Metadata => ({
  title: metadataTitle('Assistant'),
})

const AssistantPageContent = async ({
  data: { chatSession },
}: {
  data: AssistantPageData
  // eslint-disable-next-line @typescript-eslint/require-await
}) => (chatSession ? <ChatSession chatSession={chatSession} /> : null)

export default AssistantPageContent
