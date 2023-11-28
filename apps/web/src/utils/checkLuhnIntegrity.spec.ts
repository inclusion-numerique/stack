import { checkLuhnIntegrity } from './checkLuhnIntegrity'

describe('checkLuhnIntegrity', () => {
  it('devrait retourner vrai pour un numéro valide', () => {
    expect(checkLuhnIntegrity('13002603200016')).toBeTrue() // Remplacer par un vrai numéro SIRET valide
  })

  it('devrait retourner faux pour un numéro invalide', () => {
    expect(checkLuhnIntegrity('12345678901235')).toBeFalse() // Remplacer par un numéro SIRET invalide
  })

  it('devrait gérer une chaîne vide', () => {
    expect(checkLuhnIntegrity('')).toBeFalse()
  })

  it('devrait retourner faux pour une chaîne non numérique', () => {
    expect(checkLuhnIntegrity('abcdefg')).toBeFalse()
  })
})
