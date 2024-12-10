import { createTestApiV1Request } from '@app/web/app/api/v1/createTestApiV1Request'
import { expectV1ApiResponse } from '@app/web/app/api/v1/expectV1ApiResponse'
import { GET } from './route'

describe('api v1 /openapi', () => {
  it('returns api specs even if not authenticated', async () => {
    const response = GET(
      createTestApiV1Request({
        url: '/api/v1/openapi',
        method: 'GET',
      }),
    )

    await expectV1ApiResponse(response, {
      data: expect.objectContaining({
        openapi: '3.0.0',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        info: expect.objectContaining({
          title: 'La coop - API',
        }),
      }),
    })
  })
})
