import z from 'zod'
import { BackupDatabaseJobValidation } from '@app/web/jobs/backup-database/backupDatabaseJob'
import { UpdateStructuresCartographieNationaleJobValidation } from '@app/web/jobs/update-structures-cartographie-nationale/updateStructuresCartographieNationaleJob'
import { ImportCrasConseillerNumeriqueV1JobValidation } from '@app/web/jobs/import-cras-conseiller-numerique-v1/ImportCrasConseillerNumeriqueV1Job'
import { FixCoordinationsV1JobValidation } from '@app/web/jobs/fix-coordinations-v1/FixCoordinationsV1Job'

/**
 * A job represents a task that can be executed asynchronously.
 * It can be triggered by a POST to /api/jobs
 * It could also be triggered by a cli or as a side effect of a mutation.
 *
 * Each job must have an executor defined in jobExecutors.ts
 *
 * A job result should be serializable to JSON and never include sensitive data as it can be logged or stored for audit purposes.
 *
 * It is defined by a name and a payload (that can be optional).
 * The payload should be serializable to JSON for easily being passed as POST data.
 *
 * Add your jobs here.
 * To add a cron trigger, see WebAppStack Jobs definitions.
 */

export const JobValidation = z.discriminatedUnion('name', [
  BackupDatabaseJobValidation,
  UpdateStructuresCartographieNationaleJobValidation,
  ImportCrasConseillerNumeriqueV1JobValidation,
  FixCoordinationsV1JobValidation,
])

export type Job = z.infer<typeof JobValidation>

export type JobName = Job['name']

export type JobPayload<Name extends JobName> = Extract<
  Job,
  { name: Name }
>['payload']
