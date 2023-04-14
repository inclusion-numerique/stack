// eslint-disable-next-line unicorn/prevent-abbreviations
import { Command } from '@commander-js/extra-typings'
import { listSecrets } from '@stack/config/secrets/listSecrets'
import { output } from '@stack/cli/output'
import { getSecretValue } from '@stack/config/secrets/getSecretValue'
import { appendEnvVariablesToDotEnvFile } from '@stack/cli/dotEnvFile'

/**
 * This command fetches secrets from Secret Vault using scaleway keys and put them into .env
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
export const createDotEnvFromSecrets = new Command()
  .command('dotenv:from-secrets')
  .action(async () => {
    const list = await listSecrets()

    const environmentVariables = await Promise.all(
      list.secrets.map(async ({ name, id }) => {
        const value = await getSecretValue({ id })
        return { name, value }
      }),
    )

    await appendEnvVariablesToDotEnvFile({
      comment: 'Secrets variables',
      environmentVariables,
    })

    output(`${environmentVariables.length} secrets added to .env file`)
  })
