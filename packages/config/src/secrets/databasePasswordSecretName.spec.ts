import { databasePasswordSecretName } from '@lb/config/secrets/databasePasswordSecretName'

describe('databasePasswordSecretName', () => {
  it('should return a secret name', () => {
    const namespace =
      '55-a-secret-namespace-0-with1--2-numbers-and-a-very-long-text-which-should-be-truncated'
    const secretName = databasePasswordSecretName(namespace)

    expect(secretName).toEqual(
      'DATABASE_PASSWORD_A_SECRET_NAMESPACE_WITH_NUMBERS',
    )
  })
})
