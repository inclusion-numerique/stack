import crypto from 'node:crypto'

export const generateRandomSecret = (length = 32): string =>
  crypto.randomBytes(length).toString('hex')
