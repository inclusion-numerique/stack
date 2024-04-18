import * as Sentry from '@sentry/nextjs'
import type { Job, JobName, JobPayload } from '@app/web/jobs/jobs'
import { executeBackupDatabaseJob } from '@app/web/jobs/backup-database/executeBackupDatabaseJob'
import { createStopwatch } from '@app/web/utils/stopwatch'

export type JobExecutor<Name extends JobName, Result = unknown> = (
  job: Job & { name: Name; payload: JobPayload<Name> },
) => Promise<Result>

// Create an object that for each JobName, MUST has a JobExecutor<Name>
export const jobExecutors: {
  [Name in JobName]: JobExecutor<Name>
} = {
  'backup-database': executeBackupDatabaseJob,
}

export const executeJob = async (job: Job) => {
  const stopWatch = createStopwatch()

  try {
    const result = await jobExecutors[job.name](job)
    return {
      status: 'ok',
      ...stopWatch.stop(),
      result,
    }
  } catch (error) {
    Sentry.captureException(error)

    const typedError = error as {
      message?: string
      stack?: string
    }

    return {
      status: 'error',
      ...stopWatch.stop(),
      error: {
        message: typedError.message || 'Unknown error',
        stack: typedError.stack || undefined,
      },
    }
  }
}
