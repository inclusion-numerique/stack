import crypto from 'node:crypto'

/**
 * Used in rag to check if a document has changed
 */
export const createMd5Hash = (content: string) => {
  const md5sum = crypto.createHash('md5')
  md5sum.update(content)
  return md5sum.digest('hex')
}
