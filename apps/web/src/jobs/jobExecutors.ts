import { executeBackupDatabaseJob } from '@app/web/jobs/backup-database/executeBackupDatabaseJob'
import { executeFixCoordinationsV1 } from '@app/web/jobs/fix-coordinations-v1/executeFixCoordinationsV1'
import { executeImportCrasConseillerNumeriqueV1 } from '@app/web/jobs/import-cras-conseiller-numerique-v1/executeImportCrasConseillerNumeriqueV1'
import { executeIngestLesBasesInRag } from '@app/web/jobs/ingest-les-bases-in-rag/executeIngestLesBasesInRag'
import type { Job, JobName, JobPayload } from '@app/web/jobs/jobs'
import { executeSetServciesToSharedLieux } from '@app/web/jobs/set-servcies-to-shared-lieux/executeSetServciesToSharedLieux'
import { executeUpdateConumStructureReferent } from '@app/web/jobs/update-conum-structure-referent/executeUpdateConumStructureReferent'
import { updateStructureFromCartoDataApi } from '@app/web/jobs/update-structures-cartographie-nationale/updateStructureFromCartoDataApi'
import { prismaClient } from '@app/web/prismaClient'
import { createStopwatch } from '@app/web/utils/stopwatch'
import * as Sentry from '@sentry/nextjs'
import { v4 } from 'uuid'
import {
  downloadCartographieNationaleStructures,
  getStructuresCartographieNationaleFromLocalFile,
} from '../data/cartographie-nationale/cartographieNationaleStructures'
import { executeImportContactsToBrevo } from './import-contacts-to-brevo/executeImportContactsToBrevo'
import { output } from './output'

export type JobExecutor<Name extends JobName, Result = unknown> = (
  job: Job & { name: Name; payload: JobPayload<Name> },
) => Promise<Result>

const executeUpdateStructuresCartographieNationale = async () => {
  output.log(
    `update-structures-carto: fetching existing and cartographie nationale dataset`,
  )

  await downloadCartographieNationaleStructures()

  const structuresCartographieNationale =
    await getStructuresCartographieNationaleFromLocalFile()

  const execute = updateStructureFromCartoDataApi({
    structuresCartographieNationale,
  })

  const result = await execute()

  return result
}

// Create an object that for each JobName, MUST has a JobExecutor<Name>
export const jobExecutors: {
  [Name in JobName]: JobExecutor<Name>
} = {
  'backup-database': executeBackupDatabaseJob,
  'update-structures-cartographie-nationale':
    executeUpdateStructuresCartographieNationale,
  'import-cras-conseiller-numerique-v1': executeImportCrasConseillerNumeriqueV1,
  'fix-coordinations-v1': executeFixCoordinationsV1,
  'update-conum-structure-referent': executeUpdateConumStructureReferent,
  'import-contacts-to-brevo': executeImportContactsToBrevo,
  'ingest-les-bases-in-rag': executeIngestLesBasesInRag,
  'set-servcies-to-shared-lieux': executeSetServciesToSharedLieux,
}

export const executeJob = async (job: Job) => {
  const stopWatch = createStopwatch()

  const id = v4()

  await prismaClient.jobExecution.create({
    data: {
      id,
      name: job.name,
      data: job.payload,
      started: stopWatch.started,
    },
  })

  try {
    const executor = jobExecutors[job.name] as JobExecutor<(typeof job)['name']>
    const result = await executor(job)
    const { ended, duration } = stopWatch.stop()

    await prismaClient.jobExecution
      .update({
        where: { id },
        data: {
          result: result as Record<string, string>,
          completed: ended,
        },
      })
      .catch((error) => {
        if (Sentry?.captureException) {
          Sentry.captureException(error)
        }
        // biome-ignore lint/suspicious/noConsole: we need output from job executions
        console.error(error)
      })

    return {
      id,
      status: 'ok',
      result,
      duration,
    }
  } catch (error) {
    if (Sentry?.captureException) {
      Sentry.captureException(error)
    }
    // biome-ignore lint/suspicious/noConsole: we need output from job executions
    console.error(error)
    const { ended, duration } = stopWatch.stop()

    const typedError = error as {
      message?: string
      stack?: string
    }

    await prismaClient.jobExecution
      .update({
        where: { id },
        data: {
          error: typedError.message || 'Unknown error',
          errored: ended,
        },
      })
      .catch((persistenceError) => {
        Sentry.captureException(persistenceError)
      })

    return {
      status: 'error',
      duration,
      error: {
        message: typedError.message || 'Unknown error',
        stack: typedError.stack || undefined,
      },
    }
  }
}
