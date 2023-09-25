import { databasePasswordSecretName } from '@app/config/secrets/databasePasswordSecretName'

describe('databasePasswordSecretName', () => {
  it('should return dev secret name for random namespace', () => {
    expect(
      databasePasswordSecretName(
        '55-a-secret-namespace-0-with1--2-numbers-and-a-very-long-text-which-should-be-truncated',
      ),
    ).toEqual('DATABASE_PASSWORD_DEV')
  })

  it('should return main secret name for main namespace', () => {
    expect(databasePasswordSecretName('main')).toEqual('DATABASE_PASSWORD_MAIN')
  })

  it('should return dev secret name for dev namespace', () => {
    expect(databasePasswordSecretName('dev')).toEqual('DATABASE_PASSWORD_DEV')
  })
})
