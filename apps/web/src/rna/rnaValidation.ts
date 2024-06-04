export const validateValidRnaDigits = (rna: string): boolean => {
  // Vérifie que le RNA commence par 'W' suivi de 9 chiffres
  const rnaPattern = /^W\d{9}$/
  return rnaPattern.test(rna)
}
