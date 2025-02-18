import { serializeApiRequestParams } from '@app/web/app/api/v1/serializeApiRequestParams'

describe('serializeJsonApiParams', () => {
  it('should serialize a flat object', () => {
    const params = { page: 2, filter: { from: '2022', items: [1, 4, 5] } }
    const searchParams = serializeApiRequestParams(params)

    expect(searchParams).toBe('page=2&filter[from]=2022&filter[items]=1,4,5')
  })

  it('should serialize an empty object', () => {
    const params = {}
    const searchParams = serializeApiRequestParams(params)

    expect(searchParams).toBe('')
  })
})
