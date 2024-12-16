import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getChatSession } from '@app/web/app/administration/(assistant)/chat/getChatSession'
import ChatSession from '@app/web/app/administration/(assistant)/chat/ChatSession'
import CoopPageContainer from '@app/web/app/coop/CoopPageContainer'
import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'

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

  return (
    <CoopPageContainer>
      <AdministrationBreadcrumbs currentPage="Assistant" />
      <AdministrationTitle icon="fr-icon-chat-check-line">
        Assistant
      </AdministrationTitle>

      <ChatSession chatSession={chatSession} />
    </CoopPageContainer>
  )
}

export default Page
