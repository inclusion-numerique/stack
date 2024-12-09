import { transformJsonApiQueryParamsToObject } from '@app/web/app/api/v1/transformJsonApiQueryParamsToObject'

describe('transformJsonApiQueryParamsToObject', () => {
  it('should handle simple query parameters without brackets', () => {
    const params = new URLSearchParams([['sort', 'age,city']])
    const result = transformJsonApiQueryParamsToObject(params)
    expect(result).toEqual({ sort: ['age', 'city'] })
  })

  it('should handle single level bracketed parameters', () => {
    const params = new URLSearchParams([['page[size]', '10']])
    const result = transformJsonApiQueryParamsToObject(params)
    expect(result).toEqual({ page: { size: '10' } })
  })

  it('should handle multiple nested bracketed parameters', () => {
    const params = new URLSearchParams([
      ['filter[user][age]', '30'],
      ['filter[user][name]', 'john'],
    ])
    const result = transformJsonApiQueryParamsToObject(params)
    expect(result).toEqual({ filter: { user: { age: '30', name: 'john' } } })
  })

  it('should handle multiple comma separated values in nested keys', () => {
    const params = new URLSearchParams([
      ['filter[user][roles]', 'admin,editor,viewer'],
    ])
    const result = transformJsonApiQueryParamsToObject(params)
    expect(result).toEqual({
      filter: { user: { roles: ['admin', 'editor', 'viewer'] } },
    })
  })

  it('should handle multiple distinct parameters', () => {
    const params = new URLSearchParams([
      ['page[size]', '25'],
      ['page[number]', '2'],
      ['sort', 'age,city'],
      ['filter[status]', 'active'],
    ])
    const result = transformJsonApiQueryParamsToObject(params)
    expect(result).toEqual({
      page: { size: '25', number: '2' },
      sort: ['age', 'city'],
      filter: { status: 'active' },
    })
  })
})
