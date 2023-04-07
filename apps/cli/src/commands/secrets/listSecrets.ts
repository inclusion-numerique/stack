import { Argument, Command } from '@commander-js/extra-typings'
import { listSecrets as configListSecrets } from '@stack/config/secrets/listSecrets'
import { output } from '@stack/cli/output'

/**
 * This command outputs available secrets names
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
export const listSecrets = new Command()
  .command('secrets:list')
  .addArgument(
    new Argument(
      '[tags]',
      'comma delimited secret tags. e.g. "ci,web,project"',
    ),
  )
  .action(async (tagsString) => {
    const tags = tagsString ? tagsString.split(',') : []
    const { secrets } = await configListSecrets({ tags })

    output(secrets.map(({ name }) => name).join('\n'))
  })
