import { Argument, Command } from '@commander-js/extra-typings'
import { output } from '@lb/cli/output'
import { listSecrets } from '@lb/config/secrets/listSecrets'
import { findSecretByName } from '@lb/config/secrets/findSecretByName'
import { getSecretValue as configGetSecretValue } from '@lb/config/secrets/getSecretValue'
import { databasePasswordSecretName } from '@lb/config/secrets/databasePasswordSecretName'

/**
 * This command outputs available secrets names
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
export const getDatabasePasswordSecret = new Command()
  .command('secrets:database-password')
  .addArgument(
    new Argument('<namespace>', 'Namespace of the target deployment'),
  )
  .action(async (namespace) => {
    const secretName = databasePasswordSecretName(namespace)

    const { secrets } = await listSecrets()
    const { id } = findSecretByName(secrets, secretName)
    const value = await configGetSecretValue({ id })

    output(value)
  })
