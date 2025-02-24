import {
  DeploymentTargetOption,
  configureDeploymentTarget,
} from '@app/cli/deploymentTarget'
import { output } from '@app/cli/output'
import { closeMongoClient } from '@app/web/external-apis/conseiller-numerique/conseillerNumeriqueMongoClient'
import { executeJob, jobExecutors } from '@app/web/jobs/jobExecutors'
import { JobValidation } from '@app/web/jobs/jobs'
import { Argument, Command } from '@commander-js/extra-typings'

const cleanupAfterJob = async () => {
  await closeMongoClient()
}

export const executeJobCommand = new Command()
  .command('job:execute')
  .addArgument(
    new Argument('<name>', 'Job name').choices(Object.keys(jobExecutors)),
  )
  .addArgument(new Argument('[data]', 'Job data'))
  .addOption(DeploymentTargetOption)
  .action(async (name, dataAsString, options) => {
    await configureDeploymentTarget(options)
    const data: unknown = dataAsString ? JSON.parse(dataAsString) : undefined

    const jobPayload = await JobValidation.safeParseAsync({
      name,
      data,
    })

    if (!jobPayload.success) {
      output('Invalid job payload')
      output(JSON.stringify(jobPayload.error, null, 2))

      process.exit(1)
      return
    }

    const result = await executeJob(jobPayload.data)

    if (result.error) {
      output('Job failed')
      output(result.error.message)
      output(result.error.stack)
      await cleanupAfterJob()
      process.exit(1)
      return
    }
    output('Job executed successfully')
    output(JSON.stringify(result, null, 2))
    await cleanupAfterJob()
  })
