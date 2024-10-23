import { hashSecret, verifySecret } from '@app/web/security/hashSecret'

describe('hashSecret', () => {
  const plainSecret = 'uberSecret'
  const invalidSecret = 'sneakySecret'

  describe('hashSecret', () => {
    it('should return a hashed secret as a hex string', () => {
      const hashedSecret = hashSecret(plainSecret)
      expect(typeof hashedSecret).toBe('string')
      expect(hashedSecret.length).toBeGreaterThan(0) // Check that it's not empty
    })
  })

  describe('verifySecret', () => {
    it('should return true when the secret matches the hashed secret', () => {
      const hashedSecret = hashSecret(plainSecret)
      const isValid = verifySecret(plainSecret, hashedSecret)
      expect(isValid).toBe(true)
    })

    it('should return false when the secret does not match the hashed secret', () => {
      const hashedSecret = hashSecret(plainSecret)
      const isValid = verifySecret(invalidSecret, hashedSecret)
      expect(isValid).toBe(false)
    })
  })
})
