import { aiSdkAlbertEmbeddingModel } from '@app/web/assistant/aiSdkAlbertProvider'
import { createStopwatch } from '@app/web/utils/stopwatch'
import { embed } from 'ai'
import pThrottle from 'p-throttle'

const createEmbeddingThrottle = pThrottle({
  // 1000 per minute for albert
  limit: 15,
  interval: 1000,
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
