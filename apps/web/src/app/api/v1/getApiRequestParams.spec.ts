import { createTestApiV1Request } from '@app/web/app/api/v1/createTestApiV1Request'
import { JsonApiCursorPaginationQueryParamsValidation } from '@app/web/app/api/v1/CursorPagination'
import { getApiRequestParams } from '@app/web/app/api/v1/getApiRequestParams'

describe('getApiRequestParams', () => {
  it('should parse query params', () => {
    const request = createTestApiV1Request({
      url: '/api/v1/archives-v1/cras?page[size]=10&page[after]=abc',
      method: 'GET',
    })

    const params = getApiRequestParams(
      request,
      JsonApiCursorPaginationQueryParamsValidation,
    )

    expect(params).toEqual({
      success: true,
      params: {
        page: {
          size: 10,
          after: 'abc',
        },
      },
    })
  })
})
