import {
  openAiClient,
  openAiClientConfiguration,
} from '@app/web/assistant/openAiClient'
import { createStopwatch } from '@app/web/utils/stopwatch'
import pThrottle from 'p-throttle'

const createEmbeddingThrottle = pThrottle({
  limit: 95,
  interval: 60_000,
})

const createEmbeddingImmediate = async (text: string) => {
  const stopwatch = createStopwatch()
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
    duration: stopwatch.stop().duration,
  }
}

export const createEmbedding = createEmbeddingThrottle(createEmbeddingImmediate)
