import { aiSdkAlbertEmbeddingModel } from '@app/web/assistant/aiSdkAlbertProvider'
import { getRagChunksForQuery } from '@app/web/assistant/rag/getRagChunksForQuery'
import { prismaClient } from '@app/web/prismaClient'
import huitreEmbedding from './_test/testing.huitre.embedding.json'
import zebreEmbedding from './_test/testing.zebre.embedding.json'

describe('getRagChunksForQuery', () => {
  beforeAll(async () => {
    await prismaClient.ragDocumentChunk.deleteMany({
      where: {
        source: 'test',
      },
    })

    for (const testEmbedding of [huitreEmbedding, zebreEmbedding]) {
      await prismaClient.ragDocumentChunk.create({
        data: {
          id: testEmbedding.id,
          source: 'test',
          type: 'test',
          documentMd5: 'test',
          url: `https://test/${testEmbedding.name}`,
          embeddingModel: aiSdkAlbertEmbeddingModel.modelId,
          content: 'test',
          chunk: 0,
          sourceId: testEmbedding.name,
        },
      })

      await prismaClient.$queryRawUnsafe(`
          UPDATE "rag_document_chunks"
          SET embedding = '${JSON.stringify(testEmbedding.embedding)}'::vector
          WHERE id = '${testEmbedding.id}'::uuid
      `)
    }
  })

  afterAll(async () => {
    await prismaClient.ragDocumentChunk.deleteMany({
      where: {
        source: 'test',
      },
    })
  })

  it('should return a list of results', async () => {
    const response = await getRagChunksForQuery('girafe', {
      sources: ['test'],
    })

    expect(response.chunkResults).toEqual([
      {
        id: zebreEmbedding.id,
        sourceId: 'zebre',
        url: 'https://test/zebre',
        chunk: 0,
        content: 'test',
        created: expect.toBeDateString() as string,
        updated: expect.toBeDateString() as string,
        documentMd5: 'test',
        embeddingModel: aiSdkAlbertEmbeddingModel.modelId,
        similarity: expect.toBeNumber() as number,
        source: 'test',
        type: 'test',
      },
      {
        id: huitreEmbedding.id,
        sourceId: 'huitre',
        url: 'https://test/huitre',
        chunk: 0,
        content: 'test',
        created: expect.toBeDateString() as string,
        updated: expect.toBeDateString() as string,
        documentMd5: 'test',
        embeddingModel: aiSdkAlbertEmbeddingModel.modelId,
        similarity: expect.toBeNumber() as number,
        source: 'test',
        type: 'test',
      },
    ])
  })
})
