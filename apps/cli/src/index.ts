import { checkDeploymentStatus } from '@app/cli/commands/deployment/checkDeploymentStatus'
import { createGithubDeployment } from '@app/cli/commands/github/createGithubDeployment'
import { deactivateGithubDeployment } from '@app/cli/commands/github/deactivateGithubDeployment'
import { updateGithubDeployment } from '@app/cli/commands/github/updateGithubDeployment'
import { addNextPublicVariablesToDotEnv } from '@app/cli/commands/infrastructure/addNextPublicVariablesToDotEnv'
import { createDotEnvFromCdk } from '@app/cli/commands/infrastructure/createDotEnvFromCdk'
import { createTfVarsFileFromEnvironment } from '@app/cli/commands/infrastructure/createTfVarsFileFromEnvironment'
import { locallyRestoreLatestMainBackup } from '@app/cli/commands/infrastructure/locallyRestoreLatestMainBackup'
import { executeJobApiCommand } from '@app/cli/commands/jobs/executeJobApiCommand'
import { executeJobCommand } from '@app/cli/commands/jobs/executeJobCommand'
import { ingestNotionHelpCenterExportedMarkdown } from '@app/cli/commands/rag/ingestNotionHelpCenterExportedMarkdown'
import { createDotEnvFromSecrets } from '@app/cli/commands/secrets/createDotEnvFromSecrets'
import { getDatabasePasswordSecret } from '@app/cli/commands/secrets/getDatabasePasswordSecret'
import { getSecretValue } from '@app/cli/commands/secrets/getSecretValue'
import { listSecrets } from '@app/cli/commands/secrets/listSecrets'
import { setupDatabaseSecret } from '@app/cli/commands/secrets/setupDatabaseSecret'
import { listV1Emails } from '@app/cli/commands/v1/listEmails'
import { fetchAccompagnements } from '@app/cli/fetchAccompagnement'
import { output } from '@app/cli/output'
import { Command } from '@commander-js/extra-typings'

if (
  process.env.DATABASE_URL &&
  process.env.CLI_TARGET_DEPLOYMENT_DATABASE_URL === process.env.DATABASE_URL
) {
  output(
    `⚠️⚠️⚠️ Executing command on target deployment ${
      process.env.CLI_TARGET_DEPLOYMENT_BRANCH
    }`,
  )
  const databaseUrl = new URL(process.env.DATABASE_URL)
  output(`⚠️⚠️⚠️ Database: ${databaseUrl.hostname} ${databaseUrl.pathname}`)
  output('⚠️⚠️⚠️ You have 8 seconds to cancel')
  await new Promise((resolve) => {
    setTimeout(resolve, 8000)
  })
}

const program = new Command()

program.addCommand(executeJobCommand)
program.addCommand(executeJobApiCommand)
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
program.addCommand(locallyRestoreLatestMainBackup)
program.addCommand(listV1Emails)
program.addCommand(ingestNotionHelpCenterExportedMarkdown)
program.addCommand(fetchAccompagnements)

program.parse()
