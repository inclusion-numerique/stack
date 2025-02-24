import { createAccount } from '@app/web/external-apis/rdv/rdvApi'

// This test is only to be run manually by a developer on a staging instance
// Skip this test on CI
describe('rdvApi', () => {
  it('should create an account', async () => {
    const result = await createAccount({
      input: {
        agent: {
          email: 'test2@test.com',
          external_id: 'test-2',
          first_name: 'test2',
          last_name: 'test2',
        },
        organisation: {
          external_id: 'test-2',
          name: 'test2',
          address: 'test2',
        },
        lieux: [
          {
            name: 'Bureaux test',
            address: '20 avenue de Ségur, Paris, 75007',
          },
          {
            name: 'Bureaux PIX',
            address: '21 rue des Ardennes, Paris, 75019',
          },
        ],
      },
    })

    expect(result).toEqual({
      id: expect.any(Number),
    })
  })
})
