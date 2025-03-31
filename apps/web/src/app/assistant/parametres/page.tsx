import AssistantParametresPage from '@app/web/app/assistant/parametres/AssistantParametresPage'
import { getAssistantParametresPageData } from '@app/web/app/assistant/parametres/getAssistantParametresPageData'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { canEditAssistantConfiguration } from '@app/web/assistant/canUseAssistant'
import { authenticateUser } from '@app/web/auth/authenticateUser'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const generateMetadata = (): Metadata => ({
  title: metadataTitle('Assistant - Paramètres'),
})

const Page = async () => {
  const user = await authenticateUser()

  if (!canEditAssistantConfiguration(user)) {
    notFound()
  }

  const data = await getAssistantParametresPageData({ userId: user.id })

  return <AssistantParametresPage data={data} />
}

export default Page
