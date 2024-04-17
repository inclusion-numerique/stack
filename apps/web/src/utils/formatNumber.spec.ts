import { Decimal } from 'decimal.js'
import { numberToEuros } from '@app/web/utils/formatNumber'

describe('numberToEuros', () => {
  it('should correctly convert a number to Euros', () => {
    const input = 1234.56
    const expectedOutput = '1 234,56 €'
    expect(numberToEuros(input)).toEqual(expectedOutput)
  })

  it('should correctly convert a Decimal to Euros', () => {
    const input = new Decimal(1234.56)
    const expectedOutput = '1 234,56 €'
    expect(numberToEuros(input)).toEqual(expectedOutput)
  })
})
