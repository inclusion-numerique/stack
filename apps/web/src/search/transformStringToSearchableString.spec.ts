import { transformStringToSearchableString } from '@app/web/search/transformStringToSearchableString'

describe('transformStringToSearchableString', () => {
  it('should handle an empty string', () => {
    expect(transformStringToSearchableString('')).toBe('')
  })

  it('should handle a string with only spaces', () => {
    expect(transformStringToSearchableString('   ')).toBe('')
  })

  it('should handle a string with multiple kinds of whitespace', () => {
    expect(transformStringToSearchableString(' \t\n ')).toBe('')
  })

  it('should handle a string with special characters', () => {
    expect(transformStringToSearchableString('!@#$%^&*()')).toBe('')
  })

  it('should handle a string with accents', () => {
    expect(transformStringToSearchableString('áéíóú')).toBe('aeiou')
  })

  it('should handle a string with mixed case', () => {
    expect(transformStringToSearchableString('AbCdEf')).toBe('abcdef')
  })

  it('should handle a complex string', () => {
    expect(transformStringToSearchableString("Château-neuf d'hières")).toBe(
      'chateauneufdhieres',
    )
  })

  it('should handle a string with non-latin characters', () => {
    expect(transformStringToSearchableString('你好世界')).toBe('')
  })

  it('should handle a string with numbers', () => {
    expect(transformStringToSearchableString('123 AbC')).toBe('123abc')
  })

  it('should handle a string with hyphenated words', () => {
    expect(transformStringToSearchableString('well-known')).toBe('wellknown')
  })

  it('should handle a string with multiple adjacent special characters', () => {
    expect(transformStringToSearchableString('!!hello!!')).toBe('hello')
  })
})
