import { createAccount } from '@app/web/external-apis/rdv/rdvApi'

// This test is only to be run manually by a developer on a staging instance
// Skip this test on CI
describe.skip('rdvApi', () => {
  it('should create an account', async () => {
    const result = await createAccount({
      deployment: 'staging',
      input: {
        agent: {
          email: 'test@test.com',
          external_id: 'test-1',
          first_name: 'test',
          last_name: 'test',
        },
        organisation: {
          external_id: 'test-1',
          name: 'test',
          address: 'test',
        },
      },
    })

    expect(result).toEqual({
      id: 'todo',
    })
  })
})
