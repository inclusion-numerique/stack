import { createOpenAI } from '@ai-sdk/openai'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

export const aiSdkScalewayProvider = createOpenAI({
  apiKey: ServerWebAppConfig.Assistant.Scaleway.apiKey,
  baseURL: ServerWebAppConfig.Assistant.Scaleway.serviceUrl,
  compatibility: 'compatible',
  name: 'scaleway',
})
