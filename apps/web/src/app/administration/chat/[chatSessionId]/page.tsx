import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import { getChatSession } from '@app/web/assistant/getChatSession'
import AssistantPageContent from '@app/web/assistant/AssistantPageContent'
import { getAssistantPageData } from '@app/web/assistant/getAssistantPageData'

export const generateMetadata = (): Metadata => ({
  title: metadataTitle('Assistant'),
})

const Page = async ({
  params: { chatSessionId },
}: {
  params: { chatSessionId: string }
}) => {
  const chatSession = await getChatSession(chatSessionId)
  if (!chatSession) {
    notFound()
  }

  const data = await getAssistantPageData({ chatSessionId })

  return (
    <CoopPageContainer>
      <AdministrationBreadcrumbs currentPage="Assistant" />
      <AdministrationTitle icon="fr-icon-chat-check-line">
        Assistant
      </AdministrationTitle>

      <AssistantPageContent data={data} />
    </CoopPageContainer>
  )
}

export default Page
