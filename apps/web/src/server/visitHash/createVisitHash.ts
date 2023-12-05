import { createHash, randomBytes } from 'node:crypto'

export const visitDuration = 2 * 60 * 60 * 1000 // 2 hours

/**
 * A hash identifier for a visit on the website.
 */
export const createVisitHash = (seed?: string): string =>
  createHash('sha256')
    .update(seed || randomBytes(16).toString('hex'))
    .digest('hex')
