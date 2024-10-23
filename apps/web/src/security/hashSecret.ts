import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import crypto from 'node:crypto'

/**
 * Hashes a secret using HMAC with SHA-256.
 * @param secret - The plain text secret to hash.
 * @returns The hexadecimal representation of the hashed secret.
 */
export const hashSecret = (secret: string): string => {
  if (!ServerWebAppConfig.Security.hmacSecretKey) {
    throw new Error('HMAC_SECRET_KEY is not set')
  }

  return crypto
    .createHmac('sha256', ServerWebAppConfig.Security.hmacSecretKey)
    .update(secret)
    .digest('hex')
}

/**
 * Verifies if a plain secret matches the hashed secret.
 * @param secret - The plain text secret to verify.
 * @param hashedSecret - The hashed secret to compare against.
 * @returns A boolean indicating whether the secrets match.
 */
export const verifySecret = (secret: string, hashedSecret: string): boolean => {
  const hashToCompare = hashSecret(secret)
  // Use a timing-safe comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(hashToCompare, 'hex'),
    Buffer.from(hashedSecret, 'hex'),
  )
}
