import { telephoneRegex } from '@app/web/beneficiaire/BeneficiaireValidation'

describe('BeneficiaireValidation', () => {
  describe('telephoneRegex', () => {
    it.each([
      { number: '01 22 33 44 55', isValid: false },
      { number: '(+33) 1 22 33 44 55', isValid: true },
      { number: '+1 (555) 555-5555', isValid: true },
      { number: '0044 123 4567 890', isValid: true },
      { number: '123-456-7890', isValid: false },
      { number: 'abcdefg', isValid: false },
      { number: '+49 (0) 123 456 7890', isValid: true },
      { number: '+86 10 1234 5678', isValid: true },
      { number: '+91-9876543210', isValid: true },
      { number: '(+61) 3 1234 5678', isValid: true },
      { number: '+39 02 12345678', isValid: true },
    ])(
      'should validate international phone number $number as $isValid',
      ({ number, isValid }) => {
        expect(telephoneRegex.test(number)).toBe(isValid)
      },
    )
  })
})
