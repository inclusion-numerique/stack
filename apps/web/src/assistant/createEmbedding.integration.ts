import { createEmbedding } from '@app/web/assistant/createEmbedding'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

describe('createEmbedding', () => {
  it('should create an embedding', async () => {
    const result = await createEmbedding('test')
    expect(result).toMatchObject({
      model: ServerWebAppConfig.Assistant.Albert.embeddingsModel,
      embedding: expect.any(Array),
      duration: expect.any(Number),
    })

    expect(result.embedding.length).toBeGreaterThan(128)
  })
})
