import { createOpenAI } from '@ai-sdk/openai'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

export const aiSdkAlbertProvider = createOpenAI({
  apiKey: ServerWebAppConfig.Assistant.Albert.apiKey,
  baseURL: ServerWebAppConfig.Assistant.Albert.serviceUrl,
  compatibility: 'compatible',
  name: 'albert',
})

export const aiSdkAlbertEmbeddingModel = aiSdkAlbertProvider.embedding(
  ServerWebAppConfig.Assistant.Albert.embeddingsModel,
)
