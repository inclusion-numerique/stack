import { testAxios, testAxiosWithCatch } from '@app/test/testAxios'
import { ZodError } from 'zod'

describe('api/test e2e test', () => {
  beforeEach(async () => {
    await testAxios.put<string>('/test', {
      name: 'John Doe',
    })
  })

  describe('get', () => {
    test('Should get stored value', async () => {
      const response = await testAxios.get<string>('/test')
      expect(response.status).toEqual(200)
      expect(response.data).toEqual('John Doe')
    })
    test('Should update stored value', async () => {
      const response = await testAxios.put<string>('/test', {
        name: 'Jane Dane',
      })
      expect(response.status).toEqual(200)
      expect(response.data).toEqual('OK')
    })

    test('Should return 400 on invalid value sent', async () => {
      const response = await testAxiosWithCatch.put<ZodError>('/test', {
        notTheName: 'Jane dane',
      })
      expect(response.status).toEqual(400)
      // We know that zod is ok, we test that api response is 400
      expect(response.data.issues[1].code).toEqual('unrecognized_keys')
    })
  })
})
