import { createOpenAI } from '@ai-sdk/openai'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

export const aiSdkOpenaiProvider = createOpenAI({
  apiKey: ServerWebAppConfig.Assistant.OpenAi.apiKey,
})
