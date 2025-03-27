import { aiSdkAlbertEmbeddingModel } from '@app/web/assistant/aiSdkAlbertProvider'
import { createStopwatch } from '@app/web/utils/stopwatch'
import { embed } from 'ai'
import pThrottle from 'p-throttle'

const createEmbeddingThrottle = pThrottle({
  limit: 95,
  interval: 60_000,
})

const model = aiSdkAlbertEmbeddingModel

const createEmbeddingImmediate = async (text: string) => {
  const stopwatch = createStopwatch()

  const result = await embed({
    model,
    value: text,
  })

  return {
    model: model.modelId,
    embedding: result.embedding,
    duration: stopwatch.stop().duration,
  }
}

export const createEmbedding = createEmbeddingThrottle(createEmbeddingImmediate)
