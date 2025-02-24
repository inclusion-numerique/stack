import { createTestApiV1Request } from '@app/web/app/api/v1/createTestApiV1Request'
import { expectV1ApiResponseJest } from '@app/web/app/api/v1/expectV1ApiResponse.jest'
import { GET } from './route'

describe('api v1 /openapi', () => {
  it('returns api specs even if not authenticated', async () => {
    const response = GET(
      createTestApiV1Request({
        url: '/api/v1/openapi',
        method: 'GET',
      }),
    )

    await expectV1ApiResponseJest(response, {
      data: expect.objectContaining({
        openapi: '3.0.0',
        info: expect.objectContaining({
          title: 'La coop - API',
        }),
      }),
    })
  })
})
