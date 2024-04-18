import type { Job } from '@app/web/jobs/jobs'
import type { Construct } from 'constructs'
import {
  JobDefinition,
  type JobDefinitionCron,
} from '@app/scaleway/job-definition'

/**
 * See https://www.scaleway.com/en/docs/serverless/jobs/
 * And https://registry.terraform.io/providers/scaleway/scaleway/latest/docs/resources/job_definition
 */
export const createJobExecutionCron = (
  scope: Construct,
  {
    name,
    job,
    cron,
    timeout,
    internalApiPrivateKey,
    apiHostname,
  }: {
    name: string
    job: Job
    cron: JobDefinitionCron
    timeout: string
    memoryLimit: string
    cpuLimit: number
    internalApiPrivateKey: string
    apiHostname: string
  },
) => {
  const jsonData = JSON.stringify(job)

  // Escape single quotes for shell by replacing each ' with '\'' and wrap the entire string in single quotes
  // Additionally, escape double quotes that may interfere with JSON parsing in shell
  const escapedJsonData = jsonData
    .replaceAll("'", "'\\''")
    .replaceAll('"', '\\"')

  const command = `sh -c "apk --no-cache add curl && curl --max-time 21600 --request POST 'https://$API_HOSTNAME/api/jobs' --header 'Content-Type: application/json' --header 'x-api-key: $INTERNAL_API_PRIVATE_KEY' --data '${escapedJsonData}'"`

  new JobDefinition(scope, `job-${name}`, {
    name,
    cron,
    command,
    timeout,
    memoryLimit: 512,
    cpuLimit: 280,
    imageUri: 'alpine:latest',
    env: {
      INTERNAL_API_PRIVATE_KEY: internalApiPrivateKey,
      API_HOSTNAME: apiHostname,
    },
  })
}
