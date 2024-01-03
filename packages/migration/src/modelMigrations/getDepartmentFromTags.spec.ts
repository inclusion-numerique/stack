import { getDepartmentFromTags } from './getDepartmentFromTags'

describe('getDepartmentFromTags', () => {
  it('returns null when tags are undefined', () => {
    expect(getDepartmentFromTags()).toBeNull()
  })

  it('returns null when tags are null', () => {
    expect(getDepartmentFromTags(null)).toBeNull()
  })

  it('returns null when tags are empty', () => {
    expect(getDepartmentFromTags([])).toBeNull()
  })

  it('returns null when no tag has category_id equal to 6', () => {
    const tags = [
      { name: 'tag1', category_id: 1n },
      { name: 'tag2', category_id: 2n },
    ]
    expect(getDepartmentFromTags(tags)).toBeNull()
  })

  it('returns null when department tag name does not contain digits inside parenthesis', () => {
    const tags = [{ name: 'tag1', category_id: 6n }]
    expect(getDepartmentFromTags(tags)).toBeNull()
  })

  it('returns the digits inside parenthesis when department tag name contains them', () => {
    const tags = [{ name: 'Département : Puy-de-Dôme (63)', category_id: 6n }]
    expect(getDepartmentFromTags(tags)).toBe('63')
  })
})
