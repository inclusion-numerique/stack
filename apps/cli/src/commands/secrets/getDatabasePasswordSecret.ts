import { Argument, Command } from '@commander-js/extra-typings'
import { databasePasswordSecretName } from '@app/config/secrets/databasePasswordSecretName'
import { findSecretByName } from '@app/config/secrets/findSecretByName'
import { getSecretValue as configGetSecretValue } from '@app/config/secrets/getSecretValue'
import { listSecrets } from '@app/config/secrets/listSecrets'
import { output } from '@app/cli/output'

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
