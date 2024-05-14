import { formatName } from './formatName'

describe('format name', () => {
  it('should trim name', () => {
    const name: string = formatName('  Martin  ')

    expect(name).toBe('Martin')
  })

  it('should capitalize name', () => {
    const name: string = formatName('CECILE')

    expect(name).toBe('Cecile')
  })

  it('should capitalize first letter of composed names separated with hyphens', () => {
    const name: string = formatName('MARIE-ODILE')

    expect(name).toBe('Marie-Odile')
  })

  it('should capitalize first letter of composed names separated with spaces', () => {
    const name: string = formatName('BEN BRAHIM')

    expect(name).toBe('Ben Brahim')
  })

  it('should capitalize first letter of composed names with particle "du"', () => {
    const name: string = formatName('DU CHATEAU')

    expect(name).toBe('du Chateau')
  })

  it('should capitalize first letter of composed names with particle "de la"', () => {
    const name: string = formatName('DE LA CLERGERIE')

    expect(name).toBe('de La Clergerie')
  })

  it('should capitalize first letter of composed names with particle "d\'', () => {
    const name: string = formatName("GISCARD D'ESTAING")

    expect(name).toBe("Giscard d'Estaing")
  })

  it('should capitalize first letter of composed names with particle "d’', () => {
    const name: string = formatName('D’S')

    expect(name).toBe('d’S')
  })

  it('should capitalize first letter of composed names with particle "de"', () => {
    const name: string = formatName('GERBIER DE VOLOGÉ')

    expect(name).toBe('Gerbier de Vologé')
  })

  it('should capitalize first letter of composed names with particle "des"', () => {
    const name: string = formatName('DES PRÉS')

    expect(name).toBe('des Prés')
  })

  it('should capitalize first letter of composed names with particle "von der"', () => {
    const name: string = formatName('VON DER LEYEN')

    expect(name).toBe('von der Leyen')
  })

  it('should capitalize first letter of composed names with particle "von"', () => {
    const name: string = formatName('VON SCHWERIN')

    expect(name).toBe('von Schwerin')
  })

  it('should capitalize first letter of composed names with particle "da"', () => {
    const name: string = formatName('DA SILVA')

    expect(name).toBe('da Silva')
  })

  it('should capitalize first letter of composed names with particle "des" et "de"', () => {
    const name: string = formatName('DES ACRES DE L’AIGLE')

    expect(name).toBe('des Acres de L’Aigle')
  })

  it('should capitalize first letter of composed names with particle "de" et "du"', () => {
    const name: string = formatName('DE HALDAT DU LYS')

    expect(name).toBe('de Haldat du Lys')
  })

  it('should capitalize first letter of composed names with particle "\'t"', () => {
    const name: string = formatName('’T HOOFT')

    expect(name).toBe('’t Hooft')
  })

  it('should capitalize first letter of composed names with particle "t\'"', () => {
    const name: string = formatName('T’SERCLAES')

    expect(name).toBe('t’Serclaes')
  })

  it('should capitalize first letter of composed names with particle "de las"', () => {
    const name: string = formatName('DE LAS MERCEDES DE BORBON')

    expect(name).toBe('de las Mercedes de Borbon')
  })
})
