import { Command } from '@commander-js/extra-typings'
import { createDotEnvFromSecrets } from '@stack/cli/commands/secrets/createDotEnvFromSecrets'
import { createGithubDeployment } from '@stack/cli/commands/github/createGithubDeployment'
import { updateGithubDeployment } from '@stack/cli/commands/github/updateGithubDeployment'
import { deactivateGithubDeployment } from '@stack/cli/commands/github/deactivateGithubDeployment'
import { createDotEnvFromCdk } from '@stack/cli/commands/infrastructure/createDotEnvFromCdk'
import { listSecrets } from '@stack/cli/commands/secrets/listSecrets'
import { getSecretValue } from '@stack/cli/commands/secrets/getSecretValue'
import { setupDatabaseSecret } from '@stack/cli/commands/secrets/setupDatabaseSecret'
import { createTfVarsFileFromEnvironment } from '@stack/cli/commands/infrastructure/createTfVarsFileFromEnvironment'
import { checkDeploymentStatus } from '@stack/cli/commands/deployment/checkDeploymentStatus'
import { getDatabasePasswordSecret } from '@stack/cli/commands/secrets/getDatabasePasswordSecret'
import { addNextPublicVariablesToDotEnv } from '@stack/cli/commands/infrastructure/addNextPublicVariablesToDotEnv'

const program = new Command()

program.addCommand(listSecrets)
program.addCommand(getSecretValue)
program.addCommand(setupDatabaseSecret)
program.addCommand(getDatabasePasswordSecret)
program.addCommand(createDotEnvFromCdk)
program.addCommand(createDotEnvFromSecrets)
program.addCommand(addNextPublicVariablesToDotEnv)
program.addCommand(createGithubDeployment)
program.addCommand(updateGithubDeployment)
program.addCommand(deactivateGithubDeployment)
program.addCommand(createTfVarsFileFromEnvironment)
program.addCommand(checkDeploymentStatus)

program.parse()
