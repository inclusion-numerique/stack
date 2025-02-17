import { AssistantConfiguration } from '@prisma/client'
import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { defaultAssistantConfiguration } from '@app/web/assistant/configuration/defaultAssistantConfiguration'
import { AssistantConfigurationData } from '@app/web/assistant/configuration/AssistantConfigurationValidation'

export const getCurrentAssistantConfigurationForUser = async ({
  userId,
}: {
  userId: string
}): Promise<AssistantConfiguration> => {
  const { currentAssistantConfiguration } =
    await prismaClient.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      select: {
        id: true,
        currentAssistantConfiguration: true,
      },
    })

  if (currentAssistantConfiguration) {
    return currentAssistantConfiguration
  }

  return {
    ...defaultAssistantConfiguration,
    created: new Date(),
    userId,
    id: v4(),
  }
}

export const setCurrentAssistantConfigurationForUser = async ({
  userId,
  configurationId,
}: {
  userId: string
  configurationId: string
}) => {
  await prismaClient.user.update({
    where: {
      id: userId,
    },
    data: {
      currentAssistantConfigurationId: configurationId,
    },
  })
}

export const saveAssistantConfiguration = async ({
  configuration,
  userId,
  setAsCurrent,
}: {
  userId: string
  configuration: AssistantConfigurationData
  setAsCurrent: boolean
}) => {
  // Configurations are immutable, so we create a new one
  const newConfiguration = await prismaClient.assistantConfiguration.create({
    data: {
      ...configuration,
      id: v4(),
      userId,
      model: configuration.model ?? defaultAssistantConfiguration.model,
    },
  })

  if (setAsCurrent) {
    await setCurrentAssistantConfigurationForUser({
      userId,
      configurationId: newConfiguration.id,
    })
  }

  return newConfiguration
}
