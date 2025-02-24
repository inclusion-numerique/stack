import { createEmbedding } from '@app/web/assistant/createEmbedding'
import { executeRagSearch } from '@app/web/assistant/rag/executeRagSearch'

export type GetRagChunksForQueryOptions = {
  limit?: number
  sources: string[]
}

export const getRagChunksForQuery = async (
  query: string,
  { limit = 5, sources }: GetRagChunksForQueryOptions,
) => {
  const embeddedQuery = await createEmbedding(query)

  const chunkResults = await executeRagSearch({
    embedding: embeddedQuery.embedding,
    model: embeddedQuery.model,
    limit,
    sources,
  })

  return {
    chunkResults,
  }
}
