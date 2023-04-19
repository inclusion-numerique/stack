import { shortenNamespace } from '@lb/cdk/utils'

export const databasePasswordSecretName = (namespace: string) =>
  `DATABASE_PASSWORD_${shortenNamespace(
    namespace
      // Secrets name should not include digits
      .replace(/\d/g, '')
      // Secrets name should not include dashes
      .replace(/-/g, '_')
      // When digits are removed, there might be multiple underscores in a row
      .replace(/__+/g, '_')
      // Remove prefix underscore
      .replace(/^_/, ''),
    // Shorten namespace will remove trailing hyphen
    32,
  ).toUpperCase()}`
