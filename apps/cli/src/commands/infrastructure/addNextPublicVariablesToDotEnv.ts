// eslint-disable-next-line unicorn/prevent-abbreviations
import 'tsconfig-paths/register'
import { Argument, Command } from '@commander-js/extra-typings'
import { appendEnvVariablesToDotEnvFile } from '@lb/cli/dotEnvFile'

// eslint-disable-next-line unicorn/prevent-abbreviations
export const addNextPublicVariablesToDotEnv = new Command()
  .command('dotenv:add-next-public')
  .addArgument(new Argument('<namespace>', 'deployment namespace'))
  .action(async (namespace) => {
    await appendEnvVariablesToDotEnvFile({
      comment: 'Next public environment needed at build time',
      environmentVariables: [
        { name: 'NEXT_PUBLIC_SENTRY_ENVIRONMENT', value: namespace },
      ],
    })
  })
