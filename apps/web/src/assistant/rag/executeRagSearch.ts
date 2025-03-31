import { prismaClient } from '@app/web/prismaClient'

export type RagSearchChunkResult = {
  id: string
  source: string
  type: string
  content: string
  documentMd5: string
  sourceId: string
  chunk: number
  url: string | null
  title: string | null
  created: string
  updated: string
  embeddingModel: string
  similarity: number
}
export type RagSearchResult = RagSearchChunkResult[]

export const executeRagSearch = async ({
  embedding,
  model,
  limit = 10,
  sources,
}: {
  embedding: number[]
  model: string
  limit?: number
  sources?: string[]
}): Promise<RagSearchResult> => {
  const embeddingVectorParam = `[${embedding.join(',')}]`

  const sourcesFragment =
    sources && sources.length > 0
      ? `AND source IN (${sources.map((source) => `'${source}'`).join(',')})`
      : ''

  const results = await prismaClient.$queryRawUnsafe<RagSearchChunkResult[]>(
    `
        WITH similarity_scores AS (SELECT id,
                                          source,
                                          type,
                                          content,
                                          document_md5                                          as "documentMd5",
                                          source_id                                             as "sourceId",
                                          chunk,
                                          url,
                                          title,
                                          created,
                                          updated,
                                          embedding_model                                       as "embeddingModel",
                                          1 - (embedding <=> '${embeddingVectorParam}'::vector) AS similarity
                                   FROM rag_document_chunks
                                   WHERE embedding_model = '${model}' ${sourcesFragment})
        SELECT *
        FROM similarity_scores
        ORDER BY similarity DESC
        LIMIT ${limit};
    `,
  )

  return results
}
