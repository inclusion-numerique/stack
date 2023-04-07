import { Argument, Command } from '@commander-js/extra-typings'
import { output } from '@stack/cli/output'
import { listSecrets } from '@stack/config/secrets/listSecrets'
import { findSecretByName } from '@stack/config/secrets/findSecretByName'
import { getSecretValue as configGetSecretValue } from '@stack/config/secrets/getSecretValue'

/**
 * This command outputs available secrets names
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
export const getSecretValue = new Command()
  .command('secrets:get')
  .addArgument(new Argument('<name>', 'Name of the secret'))
  .action(async (name) => {
    const { secrets } = await listSecrets()
    const { id } = findSecretByName(secrets, name)
    const value = await configGetSecretValue({ id })

    output(value)
  })
