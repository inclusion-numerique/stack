import OpenAI from 'openai'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

const openAiClientConfigurationWithSensitiveData =
  ServerWebAppConfig.Assistant.service === 'scaleway'
    ? ServerWebAppConfig.Assistant.Scaleway
    : ServerWebAppConfig.Assistant.Albert

const { chatModel, apiKey, serviceUrl } =
  openAiClientConfigurationWithSensitiveData

// Do not export any sensitive data
export const openAiClientConfiguration = {
  chatModel,
}

export const openAiClient = new OpenAI({
  baseURL: serviceUrl,
  apiKey,
})
