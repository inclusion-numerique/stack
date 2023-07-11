import { titleCase } from '@app/web/utils/titleCase'

describe('titleCase', () => {
  it('should return a string with the first letter of each word capitalized', () => {
    expect(titleCase('léon-jacques SANS Àccents ÉTONNANTS lÙÔ')).toEqual(
      'Léon-Jacques Sans Àccents Étonnants Lùô',
    )
  })
})
