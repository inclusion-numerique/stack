import { Argument, Command } from '@commander-js/extra-typings'
import { output } from '@stack/cli/output'
import { listSecrets } from '@stack/config/secrets/listSecrets'
import { findSecretByName } from '@stack/config/secrets/findSecretByName'
import { getSecretValue as configGetSecretValue } from '@stack/config/secrets/getSecretValue'
import { databasePasswordSecretName } from '@stack/config/secrets/databasePasswordSecretName'

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
