/**
 * Vérifie l'intégrité d'une chaîne numérique selon la formule de Luhn.
 * @param numericString Chaîne numérique à vérifier.
 * @returns `true` si la chaîne passe le test de Luhn, sinon `false`.
 */
export const checkLuhnIntegrity = (numericString: string): boolean => {
  if (numericString.length === 0 || !/^\d+$/.test(numericString)) {
    return false
  }

  let sum = 0
  const { length } = numericString

  for (let index = 0; index < length; index += 1) {
    let digit = Number.parseInt(numericString[length - 1 - index], 10)
    if (index % 2 === 1) {
      digit *= 2
    }
    if (digit > 9) {
      digit -= 9
    }
    sum += digit
  }

  return sum % 10 === 0
}
