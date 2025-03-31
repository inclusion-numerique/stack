import { executeRagSearch } from '@app/web/assistant/rag/executeRagSearch'
import { prismaClient } from '@app/web/prismaClient'

describe('executeRagSearch', () => {
  const mostSimilarChunk = {
    id: '561ff618-b250-4da5-bdbe-f4164ede2ecc',
    source: 'test',
    type: 'test',
    sourceId: 'A',
    documentMd5: 'A',
    chunk: 0,
    content: 'test',
    embeddingModel: 'test',
    embedding: [0.2, 0.2, 0.3, 0.4, 0.5],
  }

  const secondMostSimilarChunk = {
    id: '3b67f14c-f244-46e6-8dac-0c92379518ae',
    source: 'test',
    type: 'test',
    sourceId: 'B',
    documentMd5: 'B',
    chunk: 1,
    content: 'test',
    embeddingModel: 'test',
    embedding: [0.5, 0.4, 0.1, 0.4, 0.5],
  }

  const leastSimilarChunk = {
    id: '6052acde-a897-48e8-908a-3ad518461c27',
    source: 'test',
    type: 'test',
    sourceId: 'C',
    documentMd5: 'C',
    chunk: 0,
    content: 'test',
    embeddingModel: 'test',
    embedding: [0.2, -0.2, 0.3, -0.4, -0.5],
  }

  const testRagDocumentChunks = [
    secondMostSimilarChunk,
    leastSimilarChunk,
    mostSimilarChunk,
  ]

  beforeAll(async () => {
    await prismaClient.ragDocumentChunk.deleteMany({
      where: {
        embeddingModel: 'test',
      },
    })

    for (const chunk of testRagDocumentChunks) {
      const { embedding, ...chunkWithoutEmbedding } = chunk
      await prismaClient.ragDocumentChunk.create({
        data: chunkWithoutEmbedding,
      })

      await prismaClient.$queryRawUnsafe(`
          UPDATE "rag_document_chunks"
          SET embedding = '${JSON.stringify(chunk.embedding)}'::vector
          WHERE id = '${chunk.id}'::uuid
      `)
    }
  })

  it('should return results for valid rag search query', async () => {
    const result = await executeRagSearch({
      embedding: [0.1, 0.2, 0.3, 0.4, 0.5],
      model: 'test',
      limit: 2,
    })

    // Should have A then B
    expect(result).toEqual([
      {
        id: mostSimilarChunk.id,
        chunk: 0,
        content: mostSimilarChunk.content,
        created: expect.toBeDateString() as string,
        updated: expect.toBeDateString() as string,
        documentMd5: 'A',
        embeddingModel: 'test',
        similarity: expect.toBeNumber() as number,
        source: 'test',
        sourceId: 'A',
        type: 'test',
        url: null,
        title: null,
      },
      {
        id: secondMostSimilarChunk.id,
        chunk: 1,
        content: secondMostSimilarChunk.content,
        created: expect.toBeDateString() as string,
        updated: expect.toBeDateString() as string,
        documentMd5: 'B',
        embeddingModel: 'test',
        similarity: expect.toBeNumber() as number,
        source: 'test',
        sourceId: 'B',
        type: 'test',
        url: null,
        title: null,
      },
    ])
  })
})
