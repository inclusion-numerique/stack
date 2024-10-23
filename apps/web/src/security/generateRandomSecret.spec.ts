import { generateRandomSecret } from '@app/web/security/generateRandomSecret'

describe('generateRandomSecret', () => {
  it('should generate a random secret of the specified length', () => {
    const secretLength = 32
    const randomSecret = generateRandomSecret()
    expect(typeof randomSecret).toBe('string')
    expect(randomSecret.length).toBe(secretLength * 2) // Since the secret is represented as hex, it should be twice the byte length
  })

  it('should generate different secrets on each call', () => {
    const secret1 = generateRandomSecret(32)
    const secret2 = generateRandomSecret(32)
    expect(secret1).not.toBe(secret2) // Each call should return a unique secret
  })
})
