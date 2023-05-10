import { Argument, Command } from '@commander-js/extra-typings'
import { output } from '@app/cli/output'
import { findSecretByName } from '@app/config/secrets/findSecretByName'
import { getSecretValue as configGetSecretValue } from '@app/config/secrets/getSecretValue'
import { listSecrets } from '@app/config/secrets/listSecrets'

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
