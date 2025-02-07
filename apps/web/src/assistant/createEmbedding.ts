import pThrottle from 'p-throttle'
import {
  openAiClient,
  openAiClientConfiguration,
} from '@app/web/assistant/openAiClient'

const createEmbeddingThrottle = pThrottle({
  limit: 5,
  interval: 1000,
})

const createEmbeddingImmediate = async (text: string) => {
  const response = await openAiClient.embeddings.create({
    model: openAiClientConfiguration.embeddingsModel,
    input: text,
  })

  if (!response.data.at(0)?.embedding) {
    throw new Error('Embedding not found in createEmbedding() response')
  }

  if (response.data.length > 1) {
    throw new Error(
      'More than one embedding found in createEmbedding() response',
    )
  }

  return {
    model: response.model,
    embedding: response.data[0].embedding,
  }
}

export const createEmbedding = createEmbeddingThrottle(createEmbeddingImmediate)
