import {
  requiredSiretValidation,
  optionalSiretValidation,
} from '@app/web/validation/siretValidation'

describe('Validations SIRET', () => {
  describe('siretValidation', () => {
    it('devrait valider un SIRET correct', () => {
      expect(
        optionalSiretValidation.safeParse('13002603200016').success,
      ).toBeTrue()
    })

    it('devrait valider une chaîne vide', () => {
      expect(optionalSiretValidation.safeParse('').success).toBeTrue()
    })

    it('devrait invalider un SIRET incorrect', () => {
      expect(
        optionalSiretValidation.safeParse('13002603200017').success,
      ).toBeFalse() // SIRET invalide
    })

    it('devrait invalider une valeur null', () => {
      expect(optionalSiretValidation.safeParse(null).success).toBeFalse()
    })

    it('devrait invalider une valeur undefined', () => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      expect(optionalSiretValidation.safeParse(undefined).success).toBeFalse()
    })
  })

  describe('requiredSiretValidation', () => {
    it('devrait valider un SIRET correct', () => {
      expect(
        requiredSiretValidation.safeParse('13002603200016').success,
      ).toBeTrue()
    })

    it('devrait invalider une chaîne vide', () => {
      expect(requiredSiretValidation.safeParse('').success).toBeFalse()
    })

    it('devrait invalider un SIRET incorrect', () => {
      expect(
        requiredSiretValidation.safeParse('13002603200017').success,
      ).toBeFalse() // SIRET invalide
    })

    it('devrait invalider une valeur null', () => {
      expect(requiredSiretValidation.safeParse(null).success).toBeFalse()
    })

    it('devrait invalider une valeur undefined', () => {
      // eslint-disable-next-line unicorn/no-useless-undefined
      expect(requiredSiretValidation.safeParse(undefined).success).toBeFalse()
    })
  })
})
