import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import OpenAI from 'openai'

const openAiClientConfigurationWithSensitiveData =
  ServerWebAppConfig.Assistant.service === 'scaleway'
    ? ServerWebAppConfig.Assistant.Scaleway
    : ServerWebAppConfig.Assistant.Albert

const { chatModel, apiKey, serviceUrl, embeddingsModel } =
  openAiClientConfigurationWithSensitiveData

// Do not export any sensitive data
export const openAiClientConfiguration = {
  chatModel,
  embeddingsModel,
}

export const openAiClient = new OpenAI({
  baseURL: serviceUrl,
  apiKey,
})

export { ScalewayChatModel as OpenAiClienChatModel } from '@app/web/assistant/ScalewayChatModel'
