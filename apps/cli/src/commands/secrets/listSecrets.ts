import { Command } from '@commander-js/extra-typings'
import { output } from '@app/cli/output'
import { listSecrets as configListSecrets } from '@app/config/secrets/listSecrets'

/**
 * This command outputs available secrets names
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
export const listSecrets = new Command()
  .command('secrets:list')
  .action(async () => {
    const { secrets } = await configListSecrets()

    output(secrets.map(({ name }) => name).join('\n'))
  })
