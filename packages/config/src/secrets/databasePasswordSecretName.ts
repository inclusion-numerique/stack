export const databasePasswordSecretName = (namespace: string) =>
  `DATABASE_PASSWORD_${namespace === 'main' ? 'MAIN' : 'DEV'}`
