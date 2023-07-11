import {
  containsPrefecture,
  removeAccents,
} from '@app/web/security/prefectureOrganization'

describe('containsPrefecture', () => {
  it('should remove accents from a string', () => {
    const result = removeAccents("Préfecture de l'Ain")
    expect(result).toBe("Prefecture de l'Ain")
  })

  it('should check if label contains "prefecture"', () => {
    const test1 = containsPrefecture("Préfecture de l'Ain")
    expect(test1).toBe(true)

    const test2 = containsPrefecture('Isère - PREFECTURE')
    expect(test2).toBe(true)

    const test3 = containsPrefecture('Mairie de Lyon')
    expect(test3).toBe(false)
  })
})
