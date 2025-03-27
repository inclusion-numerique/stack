import { createStopwatch } from '@app/web/utils/stopwatch'
import pThrottle from 'p-throttle'
import { aiSdkAlbertEmbeddingModel } from '@app/web/assistant/aiSdkAlbertProvider'
import { embed } from 'ai'

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
