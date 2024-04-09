import { Decimal } from 'decimal.js'
import writtenNumber from 'written-number'

export const decimalToWords = (value: Decimal) => {
  const hasDecimals = value.decimalPlaces() > 0

  if (!hasDecimals) {
    return writtenNumber(value.toNumber(), { lang: 'fr' })
  }

  const integer = value.trunc().toNumber()
  const decimals = value.minus(integer).times(100).toNumber()

  return `${writtenNumber(integer, { lang: 'fr' })} virgule ${writtenNumber(decimals, { lang: 'fr' })}`
}
