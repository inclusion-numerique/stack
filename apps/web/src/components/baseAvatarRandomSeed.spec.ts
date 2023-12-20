import { generateBaseAvatarSeed } from '@app/web/components/baseAvatarRandomSeed'

describe('BaseAvatar', () => {
  describe('generateRandomNumberFromSeed', () => {
    it('should return a number between 0 and 1', () => {
      expect(generateBaseAvatarSeed('a5e2678b4d55e')).toBe(0.526)
    })
  })
})
