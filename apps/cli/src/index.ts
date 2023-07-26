import { Command } from '@commander-js/extra-typings'
import { checkDeploymentStatus } from '@app/cli/commands/deployment/checkDeploymentStatus'
import { createGithubDeployment } from '@app/cli/commands/github/createGithubDeployment'
import { deactivateGithubDeployment } from '@app/cli/commands/github/deactivateGithubDeployment'
import { updateGithubDeployment } from '@app/cli/commands/github/updateGithubDeployment'
import { addNextPublicVariablesToDotEnv } from '@app/cli/commands/infrastructure/addNextPublicVariablesToDotEnv'
import { createDotEnvFromCdk } from '@app/cli/commands/infrastructure/createDotEnvFromCdk'
import { createTfVarsFileFromEnvironment } from '@app/cli/commands/infrastructure/createTfVarsFileFromEnvironment'
import { createDotEnvFromSecrets } from '@app/cli/commands/secrets/createDotEnvFromSecrets'
import { getDatabasePasswordSecret } from '@app/cli/commands/secrets/getDatabasePasswordSecret'
import { getSecretValue } from '@app/cli/commands/secrets/getSecretValue'
import { listSecrets } from '@app/cli/commands/secrets/listSecrets'
import { setupDatabaseSecret } from '@app/cli/commands/secrets/setupDatabaseSecret'
import { reduceCras } from '@app/cli/commands/data/reduceCras'
import { buildDatabase } from '@app/cli/commands/data/buildDatabase'
import { buildDataset } from '@app/cli/commands/deployment/buildDataset'

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
program.addCommand(reduceCras)
program.addCommand(buildDatabase)
program.addCommand(buildDataset)

program.parse()
