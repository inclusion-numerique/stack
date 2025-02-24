import { prismaClient } from '@app/web/prismaClient'

export const checkIfRagDocumentExists = async ({
  type,
  source,
  sourceId,
  documentMd5,
}: {
  type: string
  source: string
  sourceId: string
  documentMd5?: string
}) => {
  // Check if chunks already exist for this md5 (only need to check the first chunk)
  const existingChunk = await prismaClient.ragDocumentChunk.findFirst({
    where: {
      source,
      type,
      sourceId,
      documentMd5,
    },
    select: {
      id: true,
    },
  })

  return existingChunk !== null
}
