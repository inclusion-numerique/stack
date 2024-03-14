import type { Decimal } from 'decimal.js'

export const numberToString = (value: number) => value.toLocaleString('fr-FR')

export const numberToPercentage = (value: number) =>
  `${value.toPrecision(value >= 100 ? 3 : 2).toLocaleString()}%`

const convertToNumber = (value: number | Decimal): number => {
  if (typeof (value as Decimal).toNumber === 'function') {
    return (value as Decimal).toNumber()
  }
  return value as number
}

export const numberToEuros = (value: number | Decimal) =>
  `${numberToString(convertToNumber(value))} €`
