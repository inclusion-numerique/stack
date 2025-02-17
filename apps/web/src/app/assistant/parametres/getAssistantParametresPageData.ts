import { getCurrentAssistantConfigurationForUser } from '@app/web/assistant/configuration/assistantConfiguration'
import { defaultAssistantConfiguration } from '@app/web/assistant/configuration/defaultAssistantConfiguration'

export const getAssistantParametresPageData = async ({
  userId,
}: {
  userId: string
}) => {
  const userConfiguration = await getCurrentAssistantConfigurationForUser({
    userId,
  })

  return {
    userConfiguration,
    defaultConfiguration: defaultAssistantConfiguration,
  }
}

export type AssistantParametresPageData = Awaited<
  ReturnType<typeof getAssistantParametresPageData>
>
