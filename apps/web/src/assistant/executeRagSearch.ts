import { prismaClient } from '@app/web/prismaClient'

export const executeRagSearch = async ({
  embedding,
  model,
  limit = 10,
}: {
  embedding: number[]
  model: string
  limit?: number
}) => {
  const embeddingVectorParam = `[${embedding.join(',')}]`

  const results = await prismaClient.$queryRawUnsafe<
    {
      id: string
      content: string
      similarity: number
    }[]
  >(
    `
        WITH similarity_scores AS (SELECT id,
                                          content,
                                          1 - (embedding <=> '${embeddingVectorParam}'::vector) AS similarity
                                   FROM rag_document_chunks
                                   WHERE embedding_model = '${model}')
        SELECT *
        FROM similarity_scores
        ORDER BY similarity DESC
        LIMIT ${limit};
    `,
  )

  return results
}
