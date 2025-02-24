import { createEmbedding } from '@app/web/assistant/createEmbedding'
import { checkIfRagDocumentExists } from '@app/web/assistant/rag/checkIfRagDocumentExists'
import { createMd5Hash } from '@app/web/assistant/rag/createMd5Hash'
import { prismaClient } from '@app/web/prismaClient'
import { MarkdownTextSplitter } from '@langchain/textsplitters'

export type InsertMarkdownRagChunksOptions = {
  type: string
  content: string
  source: string
  sourceId: string
  url?: string
}

export type InsertMarkdownRagChunksResult = {
  unchanged: boolean
  deletedOutdatedChunks: number
  insertedChunks: number
  documentMd5: string
}

const markdownSplitter = new MarkdownTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 0,
})

/**
 * Insert a markdown document into the RAG vector database.
 *
 * It creates embeddings if document has changed.
 * It deletes outdated embeddings if document has changed.
 * It does nothing if document has not changed.
 */
export const insertMarkdownRagChunks = async ({
  type,
  content,
  source,
  sourceId,
  url,
}: InsertMarkdownRagChunksOptions): Promise<InsertMarkdownRagChunksResult> => {
  const documentMd5 = createMd5Hash(content)

  // Delete outdated chunks
  const deletedOutdatedChunks = await prismaClient.ragDocumentChunk.deleteMany({
    where: {
      source,
      sourceId,
      documentMd5: {
        not: documentMd5,
      },
    },
  })

  // Check if chunks already exist for this md5 (only need to check the first chunk)
  const existingChunk = await checkIfRagDocumentExists({
    type,
    source,
    sourceId,
    documentMd5,
  })

  if (existingChunk) {
    // No op if chunks exist with same md5 hash
    return {
      unchanged: true,
      deletedOutdatedChunks: deletedOutdatedChunks.count,
      insertedChunks: 0,
      documentMd5,
    }
  }

  const chunks = await markdownSplitter.splitText(content)

  await Promise.all(
    chunks.map(async (chunkContent, chunkIndex) => {
      const { model, embedding } = await createEmbedding(chunkContent)

      const created = await prismaClient.ragDocumentChunk.create({
        data: {
          source,
          type,
          sourceId,
          documentMd5,
          chunk: chunkIndex,
          content: chunkContent,
          url,
          embeddingModel: model,
        },
        select: {
          id: true,
        },
      })

      // Transform the number array vector in string format '[0.1, 0.2,...]'
      const embeddingVectorParam = `[${embedding.join(',')}]`

      // Prisma client do not support setting vector fields
      await prismaClient.$queryRawUnsafe(`
          UPDATE "rag_document_chunks"
          SET embedding = '${embeddingVectorParam}'::vector
          WHERE id = '${created.id}'::uuid
      `)
    }),
  )

  return {
    unchanged: false,
    deletedOutdatedChunks: deletedOutdatedChunks.count,
    insertedChunks: chunks.length,
    documentMd5,
  }
}
